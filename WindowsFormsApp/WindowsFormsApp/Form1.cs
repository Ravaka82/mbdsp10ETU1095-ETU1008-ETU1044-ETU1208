using System;
using System.Drawing;
using System.Net.Http;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace WindowsFormsApp
{
    public partial class Form1 : Form
    {
        private TextBox nomTextBox;
        private TextBox prenomTextBox;
        private TextBox emailTextBox;
        private TextBox motDePasseTextBox;
        private TextBox latitudeTextBox;
        private TextBox longitudeTextBox;
        private Button submitButton;

        public Form1()
        {
            InitializeComponent();
            InitializeCustomComponents();
        }

        private void InitializeCustomComponents()
        {
      
            this.Text = "Formulaire d'inscription";
            this.Size = new Size(400, 400); // Form size

            // Create and add TextBox controls
            this.nomTextBox = CreatePlaceholderTextBox("Nom", 20, 20);
            this.prenomTextBox = CreatePlaceholderTextBox("Prénom", 20, 60);
            this.emailTextBox = CreatePlaceholderTextBox("Email", 20, 100);
            this.motDePasseTextBox = CreatePlaceholderTextBox("Mot de passe", 20, 140);
            this.latitudeTextBox = CreatePlaceholderTextBox("Latitude", 20, 180);
            this.longitudeTextBox = CreatePlaceholderTextBox("Longitude", 20, 220);

            // Create and add submit button
            this.submitButton = new Button
            {
                Text = "S'inscrire",
                Size = new Size(150, 40), // Button size
                BackColor = Color.FromArgb(139, 69, 19), // Brown color
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            this.submitButton.FlatAppearance.BorderSize = 0;

            // Center the button horizontally
            this.submitButton.Location = new Point((this.ClientSize.Width - this.submitButton.Width) / 2, 270);
            this.submitButton.Click += new EventHandler(this.SubmitButton_Click);

            // Add controls to the form
            this.Controls.Add(nomTextBox);
            this.Controls.Add(prenomTextBox);
            this.Controls.Add(emailTextBox);
            this.Controls.Add(motDePasseTextBox);
            this.Controls.Add(latitudeTextBox);
            this.Controls.Add(longitudeTextBox);
            this.Controls.Add(submitButton);
        }

        private TextBox CreatePlaceholderTextBox(string placeholder, int x, int y)
        {
            var textBox = new TextBox
            {
                Text = placeholder,
                Location = new Point(x, y),
                Size = new Size(350, 30), // TextBox size
                ForeColor = Color.Gray
            };

            textBox.GotFocus += (sender, e) =>
            {
                if (textBox.Text == placeholder)
                {
                    textBox.Text = "";
                    textBox.ForeColor = Color.Black;
                }
            };

            textBox.LostFocus += (sender, e) =>
            {
                if (string.IsNullOrWhiteSpace(textBox.Text))
                {
                    textBox.Text = placeholder;
                    textBox.ForeColor = Color.Gray;
                }
            };

            return textBox;
        }

        private async void SubmitButton_Click(object sender, EventArgs e)
        {
            var utilisateur = new
            {
                nom = nomTextBox.Text != "Nom" ? nomTextBox.Text : string.Empty,
                prenom = prenomTextBox.Text != "Prénom" ? prenomTextBox.Text : string.Empty,
                email = emailTextBox.Text != "Email" ? emailTextBox.Text : string.Empty,
                mot_de_passe = motDePasseTextBox.Text != "Mot de passe" ? motDePasseTextBox.Text : string.Empty,
                latitude = latitudeTextBox.Text != "Latitude" ? latitudeTextBox.Text : string.Empty,
                longitude = longitudeTextBox.Text != "Longitude" ? longitudeTextBox.Text : string.Empty
            };

            var json = JsonConvert.SerializeObject(utilisateur);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                try
                {
                    var response = await client.PostAsync("http://localhost:3000/api/utilisateurs/register", data);
                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Inscription réussie !");
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de l'inscription.");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erreur : {ex.Message}");
                }
            }
        }
    }
}
