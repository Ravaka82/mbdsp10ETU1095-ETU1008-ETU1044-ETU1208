using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace WindowsFormsApp
{
    public partial class ListOtherObjectsForm : Form
    {
        private string _userId;
        private string _userToken;
        public ListOtherObjectsForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
            LoadOtherObjects();
        }

        private async void LoadOtherObjects()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Global.Token);

                try
                {
                    var response = await client.GetAsync("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/objets");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var objects = JArray.Parse(result);


                        foreach (var obj in objects)
                        {
                            var ownerId = obj["utilisateur_id"]?["_id"]?.ToString();
                            if (ownerId != _userId)
                            {
                                // Créez et configurez un panneau pour chaque objet
                                var card = new Panel
                                {
                                    Width = otherObjectsPanel.Width - 40,
                                    Height = 450,
                                    BorderStyle = BorderStyle.FixedSingle,
                                    Padding = new Padding(10),
                                    Top = 10 + 460 * (otherObjectsPanel.Controls.Count),
                                    Left = (otherObjectsPanel.Width - (otherObjectsPanel.Width - 40)) / 2
                                };

                                var titleLabel = new Label
                                {
                                    Text = $"Titre : {obj["titre"]}",
                                    AutoSize = true,
                                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                                };
                                card.Controls.Add(titleLabel);

                                var descriptionLabel = new Label
                                {
                                    Text = $"Description : {obj["description"]}",
                                    AutoSize = true,
                                    Top = titleLabel.Bottom + 5
                                };
                                card.Controls.Add(descriptionLabel);

                                var pictureBox = new PictureBox
                                {
                                    Width = 200,
                                    Height = 200,
                                    Top = descriptionLabel.Bottom + 10,
                                    SizeMode = PictureBoxSizeMode.Zoom
                                };
                                card.Controls.Add(pictureBox);
                                await LoadImageAsync(pictureBox, obj["image_url"]?.ToString());

                                var detailsLabel = new Label
                                {
                                    AutoSize = true,
                                    Top = pictureBox.Bottom + 5
                                };

                                detailsLabel.Text += $"Statut : {obj["statut"]}\n";
                                detailsLabel.Text += $"Etat : {obj["etat"]}\n";

                                decimal valeurEstimee;
                                if (decimal.TryParse(obj["valeur_estimee"]?.ToString(), out valeurEstimee))
                                {
                                    detailsLabel.Text += $"Valeur Estimée : {valeurEstimee:C}\n";
                                }
                                else
                                {
                                    detailsLabel.Text += "Valeur Estimée : Inconnue\n";
                                }

                                DateTime dateCreation;
                                if (DateTime.TryParse(obj["date_creation"]?.ToString(), out dateCreation))
                                {
                                    detailsLabel.Text += $"Date Création : {dateCreation:dd/MM/yyyy}\n";
                                }
                                else
                                {
                                    detailsLabel.Text += "Date Création : Inconnue\n";
                                }

                                DateTime dateModification;
                                if (DateTime.TryParse(obj["date_modification"]?.ToString(), out dateModification))
                                {
                                    detailsLabel.Text += $"Date Modification : {dateModification:dd/MM/yyyy}\n";
                                }
                                else
                                {
                                    detailsLabel.Text += "Date Modification : Inconnue\n";
                                }

                                card.Controls.Add(detailsLabel);
                                otherObjectsPanel.Controls.Add(card);
                            }
                        }
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


        private async Task LoadImageAsync(PictureBox pictureBox, string imageUrl)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var response = await client.GetAsync(imageUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        var imageBytes = await response.Content.ReadAsByteArrayAsync();
                        using (var ms = new System.IO.MemoryStream(imageBytes))
                        {
                            pictureBox.Image = Image.FromStream(ms);
                        }
                    }
                    else
                    {
                        pictureBox.Image = null; // Image non disponible
                    }
                }
            }
            catch
            {
                pictureBox.Image = null; // Erreur lors du chargement de l'image
            }
        }

        private void ListOtherObjectsForm_Load(object sender, EventArgs e)
        {
            // Code à exécuter lors du chargement du formulaire
        }

        private void otherObjectsPanel_Paint(object sender, PaintEventArgs e)
        {
            // Code à exécuter lors du dessin du panneau (si nécessaire)
        }
    }
}
