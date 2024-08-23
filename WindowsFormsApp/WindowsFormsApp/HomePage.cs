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
        private string _userName; // Ajouter la variable pour le nom de l'utilisateur

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
                    var response = await client.GetAsync("http://localhost:3000/api/utilisateurs/me");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var user = JObject.Parse(result);

                        _userId = user["_id"]?.ToString();
                        _userName = user["nom"]?.ToString(); // Récupération du nom de l'utilisateur
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
            // Passer l'ID et le nom de l'utilisateur au formulaire de création d'objet
            var createObjectForm = new CreateObjectForm(_userToken, _userId, _userName);
            createObjectForm.Show();
        }
    }

    public static class Global
    {
        public static string Token { get; set; }
    }
}
