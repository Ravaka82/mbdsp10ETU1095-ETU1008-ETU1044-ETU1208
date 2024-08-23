

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
        public ListOtherObjectsForm()
        {
            InitializeComponent();
            LoadOtherObjects();
        }

        private async void LoadOtherObjects()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Global.Token);

                try
                {
                    var response = await client.GetAsync("http://localhost:3000/api/objets");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var objects = JArray.Parse(result);
                        var userId = Global.Token; // Supposez que vous avez le userId dans Global

                        foreach (var obj in objects)
                        {
                            if (obj["utilisateur_id"]["_id"]?.ToString() != userId)
                            {
                                // Créez et ajoutez les panneaux pour chaque objet
                                var card = new Panel
                                {
                                    Width = this.Width - 40,
                                    Height = 450,
                                    BorderStyle = BorderStyle.FixedSingle,
                                    Padding = new Padding(10),
                                    Top = 10 + 460 * (this.Controls.Count / 2),
                                    Left = (this.Width - (this.Width - 40)) / 2
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
                                    Text = $"Statut : {obj["statut"]}\n" +
                                           $"Etat : {obj["etat"]}\n" +
                                           $"Valeur Estimée : {obj["valeur_estimee"]:C}\n" +
                                           $"Date Création : {DateTime.Parse(obj["date_creation"]?.ToString()):dd/MM/yyyy}\n" +
                                           $"Date Modification : {DateTime.Parse(obj["date_modification"]?.ToString()):dd/MM/yyyy}\n",
                                    AutoSize = true,
                                    Top = pictureBox.Bottom + 5
                                };
                                card.Controls.Add(detailsLabel);

                                this.Controls.Add(card);
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
                        pictureBox.Image = null;
                    }
                }
            }
            catch
            {
                pictureBox.Image = null;
            }
        }

        private void ListOtherObjectsForm_Load(object sender, EventArgs e)
        {

        }

        private void ListOtherObjectsForm_Load_1(object sender, EventArgs e)
        {

        }
    }
}