using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace WindowsFormsApp
{
    public partial class ExchangeObjectsForm : Form
    {
        private string _userId;
        private string _userToken;
        private Dictionary<string, string> _userObjectTitlesToIds = new Dictionary<string, string>();
        private Dictionary<string, string> _otherObjectTitlesToIds = new Dictionary<string, string>();

        public ExchangeObjectsForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
            LoadObjects();
        }

        private async void LoadObjects()
        {
            await LoadUserObjects();
            await LoadOtherObjects();
        }

        private async Task LoadUserObjects()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync($"http://localhost:3000/api/objets/utilisateur/{_userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var objects = JArray.Parse(result);

                        userObjectsListBox.Items.Clear();
                        _userObjectTitlesToIds.Clear();
                        foreach (var obj in objects)
                        {
                            var title = obj["titre"]?.ToString();
                            var id = obj["_id"]?.ToString();
                            if (title != null && id != null)
                            {
                                userObjectsListBox.Items.Add(title);
                                _userObjectTitlesToIds[title] = id;
                            }
                        }
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la récupération des objets de l'utilisateur.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private async Task LoadOtherObjects()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync("http://localhost:3000/api/objets");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var objects = JArray.Parse(result);

                        otherObjectsListBox.Items.Clear();
                        _otherObjectTitlesToIds.Clear();
                        foreach (var obj in objects)
                        {
                            var ownerId = obj["utilisateur_id"]?["_id"]?.ToString();
                            if (ownerId != _userId)
                            {
                                var title = obj["titre"]?.ToString();
                                var id = obj["_id"]?.ToString();
                                if (title != null && id != null)
                                {
                                    otherObjectsListBox.Items.Add(title);
                                    _otherObjectTitlesToIds[title] = id;
                                }
                            }
                        }
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la récupération des objets des autres utilisateurs.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private async void ValidateButton_Click(object sender, EventArgs e)
        {
            var selectedUserObject = userObjectsListBox.SelectedItem?.ToString();
            var selectedOtherObject = otherObjectsListBox.SelectedItem?.ToString();

            if (string.IsNullOrEmpty(selectedUserObject) || string.IsNullOrEmpty(selectedOtherObject))
            {
                MessageBox.Show("Veuillez sélectionner un objet de chaque liste.");
                return;
            }

            // Trouvez les IDs des objets sélectionnés
            if (!_userObjectTitlesToIds.TryGetValue(selectedUserObject, out var userObjectId) ||
                !_otherObjectTitlesToIds.TryGetValue(selectedOtherObject, out var otherObjectId))
            {
                MessageBox.Show("Erreur lors de la récupération des IDs des objets.");
                return;
            }

            // Obtenez l'ID de l'utilisateur acceptant à partir de l'objet sélectionné
            var acceptantUserId = await GetAcceptantUserId(otherObjectId);

            if (acceptantUserId == null)
            {
                MessageBox.Show("Erreur lors de la récupération de l'utilisateur acceptant.");
                return;
            }

            // Préparez les données pour la requête POST
            var exchangeData = new
            {
                utilisateur_proposant_id = _userId,
                utilisateur_acceptant_id = acceptantUserId,
                objet_proposant = userObjectId,
                objet_acceptant = otherObjectId
            };

            // Affichez les données dans la console pour le débogage
            Console.WriteLine("Données de l'échange :");
            Console.WriteLine($"Utilisateur proposant ID : {_userId}");
            Console.WriteLine($"Utilisateur acceptant ID : {acceptantUserId}");
            Console.WriteLine($"Objet proposant ID : {userObjectId}");
            Console.WriteLine($"Objet acceptant ID : {otherObjectId}");

            var content = new StringContent(JsonConvert.SerializeObject(exchangeData), Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.PostAsync("http://localhost:3000/api/echanges", content);

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        MessageBox.Show("Échange créé avec succès.");
                        Console.WriteLine("Réponse de l'API :");
                        Console.WriteLine(result);
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la création de l'échange.");
                        var errorContent = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Erreur lors de la création de l'échange :");
                        Console.WriteLine(errorContent);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                    Console.WriteLine($"Erreur : {ex.Message}");
                }
            }

            this.Close();
        }



        private async Task<string> GetAcceptantUserId(string objectId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync($"http://localhost:3000/api/objets/DetailsObjet/{objectId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var obj = JObject.Parse(result);
                        return obj["utilisateur_id"]?.ToString();
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la récupération des détails de l'objet.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
            return null;
        }

        private void otherObjectsListBox_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
