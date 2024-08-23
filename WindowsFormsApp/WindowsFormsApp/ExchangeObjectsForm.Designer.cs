namespace WindowsFormsApp
{
    partial class ExchangeObjectsForm
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.ListBox userObjectsListBox;
        private System.Windows.Forms.ListBox otherObjectsListBox;
        private System.Windows.Forms.Button validateButton;
        private System.Windows.Forms.Label userObjectsLabel;
        private System.Windows.Forms.Label otherObjectsLabel;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.userObjectsListBox = new System.Windows.Forms.ListBox();
            this.otherObjectsListBox = new System.Windows.Forms.ListBox();
            this.validateButton = new System.Windows.Forms.Button();
            this.userObjectsLabel = new System.Windows.Forms.Label();
            this.otherObjectsLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();

            // 
            // userObjectsListBox
            // 
            this.userObjectsListBox.FormattingEnabled = true;
            this.userObjectsListBox.Location = new System.Drawing.Point(12, 40);
            this.userObjectsListBox.Name = "userObjectsListBox";
            this.userObjectsListBox.Size = new System.Drawing.Size(250, 300);
            this.userObjectsListBox.TabIndex = 0;

            // 
            // otherObjectsListBox
            // 
            this.otherObjectsListBox.FormattingEnabled = true;
            this.otherObjectsListBox.Location = new System.Drawing.Point(275, 40);
            this.otherObjectsListBox.Name = "otherObjectsListBox";
            this.otherObjectsListBox.Size = new System.Drawing.Size(250, 300);
            this.otherObjectsListBox.TabIndex = 1;

            // 
            // validateButton
            // 
            this.validateButton.Location = new System.Drawing.Point(450, 350);
            this.validateButton.Name = "validateButton";
            this.validateButton.Size = new System.Drawing.Size(75, 23);
            this.validateButton.TabIndex = 2;
            this.validateButton.Text = "Valider";
            this.validateButton.UseVisualStyleBackColor = true;
            this.validateButton.Click += new System.EventHandler(this.ValidateButton_Click);

            // 
            // userObjectsLabel
            // 
            this.userObjectsLabel.AutoSize = true;
            this.userObjectsLabel.Location = new System.Drawing.Point(12, 20);
            this.userObjectsLabel.Name = "userObjectsLabel";
            this.userObjectsLabel.Size = new System.Drawing.Size(104, 13);
            this.userObjectsLabel.TabIndex = 3;
            this.userObjectsLabel.Text = "Mes Objets";

            // 
            // otherObjectsLabel
            // 
            this.otherObjectsLabel.AutoSize = true;
            this.otherObjectsLabel.Location = new System.Drawing.Point(275, 20);
            this.otherObjectsLabel.Name = "otherObjectsLabel";
            this.otherObjectsLabel.Size = new System.Drawing.Size(144, 13);
            this.otherObjectsLabel.TabIndex = 4;
            this.otherObjectsLabel.Text = "Objets des Autres Utilisateurs";

            // 
            // ExchangeObjectsForm
            // 
            this.ClientSize = new System.Drawing.Size(550, 385);
            this.Controls.Add(this.otherObjectsLabel);
            this.Controls.Add(this.userObjectsLabel);
            this.Controls.Add(this.validateButton);
            this.Controls.Add(this.otherObjectsListBox);
            this.Controls.Add(this.userObjectsListBox);
            this.Name = "ExchangeObjectsForm";
            this.Text = "Échanger Objets";
            this.ResumeLayout(false);
            this.PerformLayout();
        }
    }
}
