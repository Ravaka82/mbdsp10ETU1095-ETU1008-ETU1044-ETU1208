using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace WindowsFormsApp
{
    public partial class CreateObjectForm : Form
    {
        private string _userId;
        private string _userToken;
        private string _userName;
        private string _imagePath; 

        public CreateObjectForm(string userToken, string userId, string userName)
        {
            InitializeComponent();
            _userToken = userToken;
            _userId = userId;
            _userName = userName;

            userLabel.Text = $"Utilisateur: {_userName}";

            LoadCategories();
        }

        private async void LoadCategories()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var response = await client.GetStringAsync("http://localhost:3000/api/categories");
                    var categories = JsonConvert.DeserializeObject<List<Category>>(response);
                    categoryComboBox.DataSource = categories;
                    categoryComboBox.DisplayMember = "nom";
                    categoryComboBox.ValueMember = "_id";
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur lors du chargement des catégories : {ex.Message}");
                }
            }
        }

        private void selectImageButton_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.gif;*.bmp";
                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    _imagePath = openFileDialog.FileName;
                    pictureBox.Image = Image.FromFile(_imagePath); // Affiche l'image dans le PictureBox
                }
            }
        }

        private string GetMimeType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            switch (extension)
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".gif":
                    return "image/gif";
                case ".bmp":
                    return "image/bmp";
                default:
                    return "application/octet-stream";
            }
        }

        private async void SubmitButton_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _userToken);

                using (var multipartContent = new MultipartFormDataContent())
                {
                    // Ajoute les champs du formulaire
                    multipartContent.Add(new StringContent(_userId), "utilisateur_id");
                    multipartContent.Add(new StringContent(categoryComboBox.SelectedValue.ToString()), "categorie_id");
                    multipartContent.Add(new StringContent(titleTextBox.Text), "titre");
                    multipartContent.Add(new StringContent(descriptionTextBox.Text), "description");
                    multipartContent.Add(new StringContent(statusComboBox.SelectedItem.ToString()), "statut");
                    multipartContent.Add(new StringContent(conditionComboBox.SelectedItem.ToString()), "etat");
                    multipartContent.Add(new StringContent(valueTextBox.Text), "valeur_estimee");

                    // Ajoute l'image si elle est sélectionnée
                    if (!string.IsNullOrEmpty(_imagePath))
                    {
                        try
                        {
                            var imageContent = new ByteArrayContent(File.ReadAllBytes(_imagePath));
                            string mimeType = GetMimeType(_imagePath); 
                            imageContent.Headers.ContentType = MediaTypeHeaderValue.Parse(mimeType);
                            multipartContent.Add(imageContent, "image", Path.GetFileName(_imagePath));
                        }
                        catch (Exception ex)
                        {
                            MessageBox.Show($"Erreur lors de la lecture de l'image : {ex.Message}");
                            return;
                        }
                    }

                    try
                    {
                        var response = await client.PostAsync("http://localhost:3000/api/objets", multipartContent);
                        var responseContent = await response.Content.ReadAsStringAsync();

                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Objet créé avec succès !");
                            this.Close();
                        }
                        else
                        {
                            MessageBox.Show($"Erreur lors de la création de l'objet : {responseContent}");
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show($"Erreur lors de la requête : {ex.Message}");
                    }
                }
            }
        }
    }

    public class Category
    {
        public string _id { get; set; }
        public string nom { get; set; }
    }
}
