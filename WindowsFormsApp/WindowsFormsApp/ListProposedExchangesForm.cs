using System;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace WindowsFormsApp
{
    public partial class ListProposedExchangesForm : Form
    {
        private string _userId;
        private string _userToken;

        public ListProposedExchangesForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
        }

        private async void ListProposedExchangesForm_Load(object sender, EventArgs e)
        {
            await LoadProposedExchanges();
        }

        private async Task LoadProposedExchanges()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync($"http://localhost:3000/api/echanges/EchangePropose/{_userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var exchanges = JArray.Parse(result);

                        await DisplayExchanges(exchanges); // Assurez-vous que DisplayExchanges est awaitable
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors de la récupération des échanges proposés. Code: {response.StatusCode}, Message: {errorMessage}");
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

        private async Task DisplayExchanges(JArray exchanges)
        {
            listPanel.Controls.Clear(); // Clear existing items

            int panelTop = 10; // Position initiale du premier panel
            int panelSpacing = 10; // Espace entre chaque panel

            foreach (var exchange in exchanges)
            {
                var proposedItem = exchange["objet_proposant"];
                var acceptingItem = exchange["objet_acceptant"];
                var proposerUser = exchange["utilisateur_proposant_id"];
                var acceptorUser = exchange["utilisateur_acceptant_id"];
                var exchangeId = exchange["_id"]?.ToString(); // ID de l'échange

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
                var titleProposedLabel = new Label
                {
                    Text = $"Objet Proposé: {proposedItem?["titre"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                };
                card.Controls.Add(titleProposedLabel);

                // Image Objet Proposant
                var pictureProposedBox = new PictureBox
                {
                    Width = 150,
                    Height = 150,
                    Top = titleProposedLabel.Bottom + 5,
                    SizeMode = PictureBoxSizeMode.Zoom
                };
                card.Controls.Add(pictureProposedBox);

                // Charger l'image pour l'objet proposant
                await LoadImageAsync(pictureProposedBox, proposedItem?["image_url"]?.ToString());

                // Détails Utilisateur Proposant
                var detailsProposerLabel = new Label
                {
                    Text = $"Proposant : {proposerUser?["nom"]?.ToString() ?? "N/A"} {proposerUser?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {proposerUser?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureProposedBox.Bottom + 10
                };
                card.Controls.Add(detailsProposerLabel);

                // Titre Objet Acceptant
                var titleAcceptingLabel = new Label
                {
                    Text = $"Objet Accepté: {acceptingItem?["titre"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = detailsProposerLabel.Bottom + 10,
                    Font = new Font(FontFamily.GenericSansSerif, 12, FontStyle.Bold)
                };
                card.Controls.Add(titleAcceptingLabel);

                // Image Objet Acceptant
                var pictureAcceptingBox = new PictureBox
                {
                    Width = 150,
                    Height = 150,
                    Top = titleAcceptingLabel.Bottom + 5,
                    SizeMode = PictureBoxSizeMode.Zoom
                };
                card.Controls.Add(pictureAcceptingBox);

                // Charger l'image pour l'objet acceptant
                await LoadImageAsync(pictureAcceptingBox, acceptingItem?["image_url"]?.ToString());

                // Détails Utilisateur Acceptant
                var detailsAcceptorLabel = new Label
                {
                    Text = $"Acceptant : {acceptorUser?["nom"]?.ToString() ?? "N/A"} {acceptorUser?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {acceptorUser?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureAcceptingBox.Bottom + 10
                };
                card.Controls.Add(detailsAcceptorLabel);

                // Autres détails
                var detailsLabel = new Label
                {
                    Text = $"Statut : {exchange["statut"]?.ToString() ?? "N/A"}\n" +
                           $"Date de proposition : {exchange["date_proposition"]?.ToString() ?? "N/A"}\n",
                    AutoSize = true,
                    Top = detailsAcceptorLabel.Bottom + 10
                };
                card.Controls.Add(detailsLabel);

                // Boutons Refuser et Accepter
                var refuseButton = new Button
                {
                    Text = "Refuser",
                    Top = detailsLabel.Bottom + 10,
                    Width = 100,
                    Left = 10
                };
                refuseButton.Click += async (sender, args) =>
                {
                    await RefuserEchange(exchangeId);
                };
                card.Controls.Add(refuseButton);

                var acceptButton = new Button
                {
                    Text = "Accepter",
                    Top = detailsLabel.Bottom + 10,
                    Width = 100,
                    Left = refuseButton.Right + 10
                };
                acceptButton.Click += async (sender, args) =>
                {
                    await AccepterEchange(exchangeId, proposerUser["_id"]?.ToString(), acceptorUser["_id"]?.ToString(),
                                           proposedItem["_id"]?.ToString(), acceptingItem["_id"]?.ToString());
                };
                card.Controls.Add(acceptButton);

                // Ajout du panel de carte à listPanel
                listPanel.Controls.Add(card);

                // Ajustement de la position pour le prochain panel
                panelTop += card.Height + panelSpacing;
            }
        }

        private async Task RefuserEchange(string exchangeId)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.PutAsync($"http://localhost:3000/api/echanges/echange/{exchangeId}/statut",
                        new StringContent("{\"statut\":\"refuser\"}", System.Text.Encoding.UTF8, "application/json"));

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Vous avez refusé la proposition.");
                        await LoadProposedExchanges(); // Recharger les échanges après le refus
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors du refus : {errorMessage}");
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

        private async Task AccepterEchange(string exchangeId, string utilisateurIdProposant, string utilisateurIdAcceptant, string objetProposant, string objetAcceptant)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    // Mettre à jour le statut de l'échange
                    var response1 = await client.PutAsync($"http://localhost:3000/api/echanges/echange/{exchangeId}/statut",
                        new StringContent("{\"statut\":\"accepter\"}", System.Text.Encoding.UTF8, "application/json"));

                    if (response1.IsSuccessStatusCode)
                    {
                        // Mettre à jour l'utilisateur pour l'objet proposé
                        var response2 = await client.PutAsync($"http://localhost:3000/api/objets/Modificationobjet/{objetProposant}/utilisateur",
                            new StringContent($"{{\"utilisateur_id\":\"{utilisateurIdAcceptant}\"}}", System.Text.Encoding.UTF8, "application/json"));

                        if (response2.IsSuccessStatusCode)
                        {
                            // Mettre à jour l'utilisateur pour l'objet accepté
                            var response3 = await client.PutAsync($"http://localhost:3000/api/objets/Modificationobjet/{objetAcceptant}/utilisateur",
                                new StringContent($"{{\"utilisateur_id\":\"{utilisateurIdProposant}\"}}", System.Text.Encoding.UTF8, "application/json"));

                            if (response3.IsSuccessStatusCode)
                            {
                                MessageBox.Show("Vous avez accepté et les objets ont été échangés.");
                                await LoadProposedExchanges(); // Recharger les échanges après l'acceptation
                            }
                            else
                            {
                                var errorMessage = await response3.Content.ReadAsStringAsync();
                                MessageBox.Show($"Erreur lors de la mise à jour de l'objet acceptant : {errorMessage}");
                            }
                        }
                        else
                        {
                            var errorMessage = await response2.Content.ReadAsStringAsync();
                            MessageBox.Show($"Erreur lors de la mise à jour de l'objet proposant : {errorMessage}");
                        }
                    }
                    else
                    {
                        var errorMessage = await response1.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors de l'acceptation : {errorMessage}");
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

        private void listPanel_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
