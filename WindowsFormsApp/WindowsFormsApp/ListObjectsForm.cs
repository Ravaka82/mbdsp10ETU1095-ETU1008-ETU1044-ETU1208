using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace WindowsFormsApp
{
    public partial class ListObjectsForm : Form
    {
        private string _userId;
        private string _userToken;

        public ListObjectsForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
            LoadObjects();
        }

        private async void LoadObjects()
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
                    var response = await client.GetAsync($"http://localhost:3000/api/objets/utilisateur/{_userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var objects = JsonConvert.DeserializeObject<List<Objet>>(result);

                        // Assurez-vous que cardsPanel est bien défini dans votre formulaire
                        DisplayObjects(objects);
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la récupération des objets.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }

        private void DisplayObjects(List<Objet> objects)
        {
            // Assurez-vous que cardsPanel est un conteneur (Panel, FlowLayoutPanel, etc.)
            foreach (var obj in objects)
            {
                var card = new ObjectCard();
                card.SetObjectData(obj);
                cardsPanel.Controls.Add(card);
            }
        }
    }

    public class Objet
    {
        [JsonProperty("titre")]
        public string Titre { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("statut")]
        public string Statut { get; set; }

        [JsonProperty("etat")]
        public string Etat { get; set; }

        [JsonProperty("valeur_estimee")]
        public decimal ValeurEstimee { get; set; }

        [JsonProperty("image_url")]
        public string ImageUrl { get; set; }

        [JsonProperty("date_creation")]
        public DateTime DateCreation { get; set; }

        [JsonProperty("date_modification")]
        public DateTime DateModification { get; set; }
    }
}
