using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
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

                        DisplayObjectsAsync(objects);
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

        private async Task DisplayObjectsAsync(List<Objet> objects)
        {
           
            cardsPanel.Controls.Clear();

            int panelTop = 10; // Position initiale du premier panel
            int panelSpacing = 10; // Espace entre chaque panel

         
            foreach (var obj in objects)
            {
            
                var card = new Panel
                {
                    Width = cardsPanel.Width - 20, 
                    Height = 450, // Hauteur ajustée pour chaque panel
                    BorderStyle = BorderStyle.FixedSingle,
                    Padding = new Padding(10),
                    Top = panelTop,
                    Left = (cardsPanel.Width - (cardsPanel.Width - 40)) / 2 // Centre le card
                };

                // Titre
                var titleLabel = new Label
                {
                    Text = $"Titre : {obj.Titre}",
                    AutoSize = true,
                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                };
                card.Controls.Add(titleLabel);

                // Description
                var descriptionLabel = new Label
                {
                    Text = $"Description : {obj.Description}",
                    AutoSize = true,
                    Top = titleLabel.Bottom + 5
                };
                card.Controls.Add(descriptionLabel);

                // Image
                var pictureBox = new PictureBox
                {
                    Width = 200,
                    Height = 200,
                    Top = descriptionLabel.Bottom + 10,
                    SizeMode = PictureBoxSizeMode.Zoom
                };
                card.Controls.Add(pictureBox);

                // Charger l'image depuis l'URL
                await LoadImageAsync(pictureBox, obj.ImageUrl);

                // Autres détails
                var detailsLabel = new Label
                {
                    Text = $"Statut : {obj.Statut}\n" +
                           $"Etat : {obj.Etat}\n" +
                           $"Valeur Estimée : {obj.ValeurEstimee:C}\n" +
                           $"Date Création : {obj.DateCreation:dd/MM/yyyy}\n" +
                           $"Date Modification : {obj.DateModification:dd/MM/yyyy}\n",
                    AutoSize = true,
                    Top = pictureBox.Bottom + 5
                };
                card.Controls.Add(detailsLabel);

                // Ajout du panel de carte à cardsPanel
                cardsPanel.Controls.Add(card);

                // Ajustement de la position pour le prochain panel
                panelTop += card.Height + panelSpacing;
            }
        }



        private async Task LoadImageAsync(PictureBox pictureBox, string imageUrl)
        {
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

        private void cardsPanel_Paint(object sender, PaintEventArgs e)
        {

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
