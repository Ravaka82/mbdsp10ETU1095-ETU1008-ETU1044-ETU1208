using System;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace WindowsFormsApp
{
    public partial class HomePage : Form
    {
        private string _userId;
        private string _userToken;
        private string _userName;

        public HomePage()
        {
            InitializeComponent();
            _userToken = Global.Token;
            LoadUserData();
        }

        private async void LoadUserData()
        {
            using (var client = new HttpClient())
            {
                if (string.IsNullOrEmpty(_userToken))
                {
                    MessageBox.Show("Token utilisateur non disponible.");
                    return;
                }

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/utilisateurs/me");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var user = JObject.Parse(result);

                        _userId = user["_id"]?.ToString();
                        _userName = user["nom"]?.ToString();
                        welcomeLabel.Text = $"Bienvenue, {_userName} !";
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la récupération des données utilisateur.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private void CreateObjectButton_Click(object sender, EventArgs e)
        {
            var createObjectForm = new CreateObjectForm(_userToken, _userId, _userName);
            createObjectForm.Show();
        }

        private void ListObjectsButton_Click(object sender, EventArgs e)
        {
            var listObjectsForm = new ListObjectsForm(_userId, _userToken);
            listObjectsForm.Show();
        }
        private async void ListOtherObjectsButton_Click(object sender, EventArgs e)
        {
            var listOtherObjectsForm = new ListOtherObjectsForm();
            listOtherObjectsForm.Show();
        }
        private async void ExchangeButton_Click(object sender, EventArgs e)
        {
         
            var exchangeForm = new ExchangeObjectsForm(_userId, _userToken);
            exchangeForm.Show();
        }

        private async void ListWishButton_Click(object sender, EventArgs e)
        {

            // Ouvrir le formulaire pour afficher les souhaits
            var listWishForm = new ListWishForm(_userId, _userToken);
            listWishForm.Show();
        }
        private async void ListProposedExchangesButton_Click(object sender, EventArgs e)
        {
            var listProposedExchangesForm = new ListProposedExchangesForm(_userId, _userToken);
            listProposedExchangesForm.Show();
        }
        private void ViewHistoryButton_Click(object sender, EventArgs e)
        {
            var viewHistoryForm = new ViewHistoryForm(_userId, _userToken);
            viewHistoryForm.Show();
        }
        private async void LogoutButton_Click(object sender, EventArgs e)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                    var response = await client.PostAsync("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/admin/logout", null);

                        _userToken = null;
                        Global.Token = null;

                     
                        MessageBox.Show("Déconnexion réussie.");

                 
                        this.Close();

                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur : {ex.Message}");
            }
        }




        private void HomePage_Load(object sender, EventArgs e)
        {

        }

        private void navbarPanel_Paint(object sender, PaintEventArgs e)
        {

        }
    }

    public static class Global
    {
        public static string Token { get; set; }
    }
}
