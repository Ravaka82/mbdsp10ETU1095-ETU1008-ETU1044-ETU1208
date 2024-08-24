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
        private LinkLabel loginLinkLabel;

        public Form1()
        {
            InitializeComponent();
            InitializeCustomComponents();
        }

        private void InitializeCustomComponents()
        {

            this.Text = "Formulaire d'inscription";
            this.Size = new Size(450, 500);


            this.nomTextBox = CreatePlaceholderTextBox("Nom", 20, 20);
            this.prenomTextBox = CreatePlaceholderTextBox("Prénom", 20, 60);
            this.emailTextBox = CreatePlaceholderTextBox("Email", 20, 100);
            this.motDePasseTextBox = CreatePlaceholderTextBox("Mot de passe", 20, 140);
            this.latitudeTextBox = CreatePlaceholderTextBox("Latitude", 20, 180);
            this.longitudeTextBox = CreatePlaceholderTextBox("Longitude", 20, 220);


            this.submitButton = new Button
            {
                Text = "S'inscrire",
                Size = new Size(120, 30),
                BackColor = Color.Purple,
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            this.submitButton.FlatAppearance.BorderSize = 0;
            this.submitButton.Location = new Point((this.ClientSize.Width - this.submitButton.Width) / 2, 270);
            this.submitButton.Click += new EventHandler(this.SubmitButton_Click);

            // Create and add login link
            this.loginLinkLabel = new LinkLabel
            {
                Text = "Vous-voulez vous connecter ?",
                Location = new Point((this.ClientSize.Width - 200) / 2, 360),
                Size = new Size(200, 30),
                LinkColor = Color.Blue,
                VisitedLinkColor = Color.Purple,
                Font = new Font("Arial", 10)
            };
            this.loginLinkLabel.LinkClicked += new LinkLabelLinkClickedEventHandler(this.LoginLinkLabel_LinkClicked);

            // Add controls to the form
            this.Controls.Add(nomTextBox);
            this.Controls.Add(prenomTextBox);
            this.Controls.Add(emailTextBox);
            this.Controls.Add(motDePasseTextBox);
            this.Controls.Add(latitudeTextBox);
            this.Controls.Add(longitudeTextBox);
            this.Controls.Add(submitButton);
            this.Controls.Add(loginLinkLabel);
        }

        private TextBox CreatePlaceholderTextBox(string placeholder, int x, int y)
        {
            var textBox = new TextBox
            {
                Text = placeholder,
                Location = new Point(x, y),
                Size = new Size(800, 30), // Increase TextBox size
                ForeColor = Color.Purple
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
                    var response = await client.PostAsync("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/utilisateurs/register", data);
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

        private void LoginLinkLabel_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {

            LoginForm loginForm = new LoginForm();
            loginForm.StartPosition = FormStartPosition.CenterParent; // Center the login form
            loginForm.ShowDialog(); // Use ShowDialog to make it modal
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }

    public partial class LoginForm : Form
    {
        private TextBox emailTextBox;
        private TextBox motDePasseTextBox;
        private Button loginButton;

        public LoginForm()
        {

            InitializeLoginComponents();
        }

        private void InitializeLoginComponents()
        {
            // Adjust form size
            this.Text = "Connexion";
            this.Size = new Size(350, 200);


            this.emailTextBox = CreatePlaceholderTextBox("Email", 20, 20);
            this.motDePasseTextBox = CreatePlaceholderTextBox("Mot de passe", 20, 60);


            this.loginButton = new Button
            {
                Text = "Se connecter",
                Size = new Size(120, 30),
                BackColor = Color.Purple,
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat,
                Font = new Font("Arial", 10, FontStyle.Bold)
            };
            this.loginButton.FlatAppearance.BorderSize = 0;
            this.loginButton.Location = new Point((this.ClientSize.Width - this.loginButton.Width) / 2, 100);
            this.loginButton.Click += new EventHandler(this.LoginButton_Click);

            this.Controls.Add(emailTextBox);
            this.Controls.Add(motDePasseTextBox);
            this.Controls.Add(loginButton);
        }

        private TextBox CreatePlaceholderTextBox(string placeholder, int x, int y)
        {
            var textBox = new TextBox
            {
                Text = placeholder,
                Location = new Point(x, y),
                Size = new Size(300, 30),
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

        private async void LoginButton_Click(object sender, EventArgs e)
        {
            var utilisateur = new
            {
                email = emailTextBox.Text != "Email" ? emailTextBox.Text : string.Empty,
                mot_de_passe = motDePasseTextBox.Text != "Mot de passe" ? motDePasseTextBox.Text : string.Empty
            };

            var json = JsonConvert.SerializeObject(utilisateur);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                try
                {
                    var response = await client.PostAsync("https://mbdsp10etu1095-etu1008-etu1044-etu1208.onrender.com/api/utilisateurs/login", data);
                    if (response.IsSuccessStatusCode)
                    {
                        var result = await response.Content.ReadAsStringAsync();
                        var responseObject = JsonConvert.DeserializeObject<dynamic>(result);

                        if (responseObject.auth == true)
                        {
                            string token = responseObject.token;
                            // Store the token (e.g., in a static variable or settings)
                            Global.Token = token;

                            // Redirect to home page
                            HomePage homePage = new HomePage();
                            homePage.StartPosition = FormStartPosition.CenterParent; // Center the home page
                            homePage.ShowDialog(); // Show home page as a modal form
                            this.Close(); // Close the login form
                        }
                        else
                        {
                            MessageBox.Show("Erreur lors de la connexion.");
                        }
                    }
                    else
                    {
                        MessageBox.Show("Erreur lors de la connexion.");
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

