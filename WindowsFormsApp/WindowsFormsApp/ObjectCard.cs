using System;
using System.Drawing;
using System.Windows.Forms;
using WindowsFormsApp;

public class ObjectCard : Panel
{
    private PictureBox _pictureBox;
    private Label _titleLabel;
    private Label _descriptionLabel;
    private Label _statusLabel;
    private Label _valueLabel;

    public ObjectCard()
    {
        InitializeComponents();
    }

    private void InitializeComponents()
    {
        // Configure le panneau principal
        this.BackColor = Color.FromArgb(128, 0, 0);
        this.BorderStyle = BorderStyle.None;
        this.Padding = new Padding(10);
        this.Height = 300; // Augmenté pour plus d'espace
        this.Width = 250;  // Ajustez la largeur en fonction de l'espace disponible
        this.Margin = new Padding(10);

        // PictureBox pour l'image
        _pictureBox = new PictureBox
        {
            SizeMode = PictureBoxSizeMode.StretchImage,
            Dock = DockStyle.Top,
            Height = 150,
            BackColor = Color.LightGray // Couleur de fond en cas de chargement lent
        };

        // Label pour le titre
        _titleLabel = new Label
        {
            Font = new Font("Arial", 14F, FontStyle.Bold),
            Dock = DockStyle.Top,
            Height = 35,
            TextAlign = ContentAlignment.MiddleLeft,
            ForeColor = Color.White, // Couleur du texte
            Padding = new Padding(5)
        };

        // Label pour la description
        _descriptionLabel = new Label
        {
            Dock = DockStyle.Top,
            Height = 50,
            TextAlign = ContentAlignment.MiddleLeft,
            ForeColor = Color.LightGray,
            Padding = new Padding(5)
        };

        // Label pour le statut
        _statusLabel = new Label
        {
            Dock = DockStyle.Top,
            Height = 30,
            TextAlign = ContentAlignment.MiddleLeft,
            ForeColor = Color.FromArgb(0, 255, 0),
            Padding = new Padding(5)
        };

        // Label pour la valeur
        _valueLabel = new Label
        {
            Dock = DockStyle.Top,
            Height = 30,
            TextAlign = ContentAlignment.MiddleLeft,
            ForeColor = Color.Cyan, // Couleur pour la valeur
            Padding = new Padding(5)
        };

        // Ajout des contrôles au panneau
        this.Controls.Add(_valueLabel);
        this.Controls.Add(_statusLabel);
        this.Controls.Add(_descriptionLabel);
        this.Controls.Add(_titleLabel);
        this.Controls.Add(_pictureBox);

        // Gestion des erreurs de chargement de l'image
        _pictureBox.LoadCompleted += (sender, e) =>
        {
            if (_pictureBox.Image == null)
            {
                MessageBox.Show("Erreur de chargement de l'image.");
            }
        };

        // Optionnel : Ajouter des animations de survol
        this.MouseEnter += (s, e) => this.BackColor = Color.FromArgb(139, 0, 0);
        this.MouseLeave += (s, e) => this.BackColor = Color.FromArgb(128, 0, 0);
    }

    public void SetObjectData(Objet obj)
    {
        if (string.IsNullOrEmpty(obj.ImageUrl))
        {
            MessageBox.Show("URL de l'image non disponible.");
            return;
        }

        _pictureBox.ImageLocation = obj.ImageUrl;

        _titleLabel.Text = obj.Titre;
        _descriptionLabel.Text = obj.Description;
        _statusLabel.Text = $"Statut: {obj.Statut}";
        _valueLabel.Text = $"Valeur Estimée: {obj.ValeurEstimee:C}";
    }
}
