using System;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace WindowsFormsApp
{
    public partial class ListWishForm : Form
    {
        private string _userId;
        private string _userToken;

        public ListWishForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
        }

        private async void ListWishForm_Load(object sender, EventArgs e)
        {
            await LoadEchanges();
        }

        private async Task LoadEchanges()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync($"http://localhost:3000/api/echanges/lisesobjetsouhaites/{_userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var echanges = JArray.Parse(result);

                        await DisplayEchanges(echanges); // Assurez-vous que DisplayEchanges est awaitable
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Notification: {response.StatusCode}, Message: {errorMessage}");
                    }
                }
                catch (HttpRequestException httpEx)
                {
                    MessageBox.Show($"Erreur de requête HTTP : {httpEx.Message}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private async Task DisplayEchanges(JArray echanges)
        {
            listPanel.Controls.Clear(); // Clear existing items

            int panelTop = 10; // Position initiale du premier panel
            int panelSpacing = 10; // Espace entre chaque panel

            foreach (var echange in echanges)
            {
                var objetProposant = echange["objet_proposant"];
                var objetAcceptant = echange["objet_acceptant"];
                var utilisateurProposant = echange["utilisateur_proposant_id"];
                var utilisateurAcceptant = echange["utilisateur_acceptant_id"];
                var echangeId = echange["_id"]?.ToString(); // ID de l'échange

                var card = new Panel
                {
                    Width = listPanel.Width - 20,
                    Height = 550, // Hauteur ajustée pour chaque panel
                    BorderStyle = BorderStyle.FixedSingle,
                    Padding = new Padding(10),
                    Top = panelTop,
                    Left = (listPanel.Width - (listPanel.Width - 40)) / 2 // Centre le card
                };

                // Titre Objet Proposant
                var titleProposantLabel = new Label
                {
                    Text = $" Objet Proposé: {objetProposant?["titre"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                };
                card.Controls.Add(titleProposantLabel);

                // Image Objet Proposant
                var pictureProposantBox = new PictureBox
                {
                    Width = 150,
                    Height = 150,
                    Top = titleProposantLabel.Bottom + 5,
                    SizeMode = PictureBoxSizeMode.Zoom
                };
                card.Controls.Add(pictureProposantBox);

                // Charger l'image pour l'objet proposant
                await LoadImageAsync(pictureProposantBox, objetProposant?["image_url"]?.ToString());

                // Détails Utilisateur Proposant
                var detailsProposantLabel = new Label
                {
                    Text = $"Proposant : {utilisateurProposant?["nom"]?.ToString() ?? "N/A"} {utilisateurProposant?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {utilisateurProposant?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureProposantBox.Bottom + 10
                };
                card.Controls.Add(detailsProposantLabel);

                // Titre Objet Acceptant
                var titleAcceptantLabel = new Label
                {
                    Text = $"Objet Souhaité: {objetAcceptant?["titre"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = detailsProposantLabel.Bottom + 10,
                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                };
                card.Controls.Add(titleAcceptantLabel);

                // Image Objet Acceptant
                var pictureAcceptantBox = new PictureBox
                {
                    Width = 150,
                    Height = 150,
                    Top = titleAcceptantLabel.Bottom + 5,
                    SizeMode = PictureBoxSizeMode.Zoom
                };
                card.Controls.Add(pictureAcceptantBox);

                // Charger l'image pour l'objet acceptant
                await LoadImageAsync(pictureAcceptantBox, objetAcceptant?["image_url"]?.ToString());

                // Détails Utilisateur Acceptant
                var detailsAcceptantLabel = new Label
                {
                    Text = $"Acceptant : {utilisateurAcceptant?["nom"]?.ToString() ?? "N/A"} {utilisateurAcceptant?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {utilisateurAcceptant?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureAcceptantBox.Bottom + 10
                };
                card.Controls.Add(detailsAcceptantLabel);

                // Autres détails
                var detailsLabel = new Label
                {
                    Text = $"Statut : {echange["statut"]?.ToString() ?? "N/A"}\n" +
                           $"Date de proposition : {echange["date_proposition"]?.ToString() ?? "N/A"}\n",
                    AutoSize = true,
                    Top = detailsAcceptantLabel.Bottom + 10
                };
                card.Controls.Add(detailsLabel);

                // Bouton Supprimer
                var deleteButton = new Button
                {
                    Text = "Supprimer",
                    Width = 100,
                    Top = detailsLabel.Bottom + 10
                };
                deleteButton.Click += async (s, ea) => await DeleteEchange(echangeId); // Attacher l'événement pour supprimer
                card.Controls.Add(deleteButton);

                // Bouton Valider
                var validateButton = new Button
                {
                    Text = "Valider Souhait",
                    Width = 150,
                    Top = deleteButton.Bottom + 10
                };
                validateButton.Click += async (s, ea) => await ValidateEchange(echangeId); // Attacher l'événement pour valider
                card.Controls.Add(validateButton);

                // Ajout du panel de carte à listPanel
                listPanel.Controls.Add(card);

                // Ajustement de la position pour le prochain panel
                panelTop += card.Height + panelSpacing;
            }
        }



        private async Task LoadImageAsync(PictureBox pictureBox, string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl)) return;

            using (var client = new HttpClient())
            {
                try
                {
                    var imageBytes = await client.GetByteArrayAsync(imageUrl);
                    using (var ms = new System.IO.MemoryStream(imageBytes))
                    {
                        pictureBox.Image = Image.FromStream(ms);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur lors du chargement de l'image : {ex.Message}");
                }
            }
        }

        private async Task ValidateEchange(string echangeId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    // Crée un objet avec le statut à envoyer
                    var requestBody = new
                    {
                        statut = "en attente" // Assurez-vous que le statut est correctement défini
                    };

                    // Sérialiser l'objet en JSON
                    var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
                    var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                    // Envoi de la requête PUT à l'API pour valider l'échange spécifié par echangeId
                    var response = await client.PutAsync($"http://localhost:3000/api/echanges/statut/{echangeId}", content);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Echange en attente de validation .");
                        await LoadEchanges(); // Recharge les échanges après validation
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors de la validation de l'échange. Code: {response.StatusCode}, Message: {errorMessage}");
                    }
                }
                catch (HttpRequestException httpEx)
                {
                    MessageBox.Show($"Erreur de requête HTTP : {httpEx.Message}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private async Task DeleteEchange(string echangeId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    // Envoi de la requête DELETE à l'API pour l'échange spécifié par echangeId
                    var response = await client.DeleteAsync($"http://localhost:3000/api/echanges/{echangeId}");

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Echange supprimé avec succès.");
                        await LoadEchanges(); // Recharge les échanges après suppression
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors de la suppression de l'échange. Code: {response.StatusCode}, Message: {errorMessage}");
                    }
                }
                catch (HttpRequestException httpEx)
                {
                    MessageBox.Show($"Erreur de requête HTTP : {httpEx.Message}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private void listPanel_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}