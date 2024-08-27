using System;
using System.Drawing;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace WindowsFormsApp
{
    public partial class ViewHistoryForm : Form
    {
        private string _userId;
        private string _userToken;

        public ViewHistoryForm(string userId, string userToken)
        {
            InitializeComponent();
            _userId = userId;
            _userToken = userToken;
        }

        private async void ViewHistoryForm_Load(object sender, EventArgs e)
        {
            await LoadHistorique();
        }

        private async Task LoadHistorique()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                try
                {
                    var response = await client.GetAsync($"https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/echanges/historique/{_userId}");

                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var historique = JArray.Parse(result);

                        await DisplayHistorique(historique);
                    }
                    else
                    {
                        var errorMessage = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Erreur lors de la récupération de l'historique. Code: {response.StatusCode}, Message: {errorMessage}");
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

        private async Task DisplayHistorique(JArray historique)
        {
            listPanel.Controls.Clear();

            int panelTop = 10;
            int panelSpacing = 10;

            foreach (var echange in historique)
            {
                var objetProposant = echange["objet_proposant"] as JObject;
                var objetAcceptant = echange["objet_acceptant"] as JObject;
                var utilisateurProposant = echange["utilisateur_proposant_id"] as JObject;
                var utilisateurAcceptant = echange["utilisateur_acceptant_id"] as JObject;
                var dateEchange = echange["date_acceptation"]?.ToString();
                var statut = echange["statut"]?.ToString();

                // Vérifier si tous les champs sont "N/A" ou null
                if (string.IsNullOrEmpty(objetProposant?["titre"]?.ToString()) &&
                    string.IsNullOrEmpty(objetAcceptant?["titre"]?.ToString()) &&
                    string.IsNullOrEmpty(utilisateurProposant?["nom"]?.ToString()) &&
                    string.IsNullOrEmpty(utilisateurProposant?["prenom"]?.ToString()) &&
                    string.IsNullOrEmpty(utilisateurAcceptant?["nom"]?.ToString()) &&
                    string.IsNullOrEmpty(utilisateurAcceptant?["prenom"]?.ToString()) &&
                    string.IsNullOrEmpty(dateEchange) &&
                    string.IsNullOrEmpty(statut))
                {
                    // Si tout est "N/A" ou null, passer à l'échange suivant
                    continue;
                }

                var card = new Panel
                {
                    Width = listPanel.Width - 20,
                    Height = 550,
                    BorderStyle = BorderStyle.FixedSingle,
                    Padding = new Padding(10),
                    Top = panelTop,
                    Left = (listPanel.Width - (listPanel.Width - 40)) / 2
                };

                // Colorer le card en fonction du statut
                if (statut == "accepte")
                {
                    card.BackColor = Color.LightGreen;
                }
                else if (statut == "refuse")
                {
                    card.BackColor = Color.LightCoral;
                }
                else if (statut == "attente")
                {
                    card.BackColor = Color.LightYellow;
                }
                else
                {
                    card.BackColor = Color.LightGray;
                }

                // Titre Objet Proposant
                var titleProposantLabel = new Label
                {
                    Text = $"objet: {objetProposant?["titre"]?.ToString() ?? "N/A"}",
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
                    Text = $"Propriétaire : {utilisateurProposant?["nom"]?.ToString() ?? "N/A"} {utilisateurProposant?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {utilisateurProposant?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureProposantBox.Bottom + 10
                };
                card.Controls.Add(detailsProposantLabel);

                // Titre Objet Acceptant
                var titleAcceptantLabel = new Label
                {
                    Text = $"Mon nouveau objet: {objetAcceptant?["titre"]?.ToString() ?? "N/A"}",
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
                    Text = $"Moi : {utilisateurAcceptant?["nom"]?.ToString() ?? "N/A"} {utilisateurAcceptant?["prenom"]?.ToString() ?? "N/A"}\n" +
                           $"Email : {utilisateurAcceptant?["email"]?.ToString() ?? "N/A"}",
                    AutoSize = true,
                    Top = pictureAcceptantBox.Bottom + 10
                };
                card.Controls.Add(detailsAcceptantLabel);

                // Autres détails
                var detailsLabel = new Label
                {
                    Text = $"Date d'échange : {dateEchange}\n" +
                           $"Statut : {statut ?? "N/A"}",
                    AutoSize = true,
                    Top = detailsAcceptantLabel.Bottom + 10
                };
                card.Controls.Add(detailsLabel);

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

        private void listPanel_Paint(object sender, PaintEventArgs e)
        {

        }

    }
}
