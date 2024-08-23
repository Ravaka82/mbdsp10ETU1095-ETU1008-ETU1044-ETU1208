namespace WindowsFormsApp
{
    partial class HomePage
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.Label welcomeLabel;
        private System.Windows.Forms.Button createObjectButton;
        private System.Windows.Forms.Button listObjectButton;
        private System.Windows.Forms.Button listOtherObjectsButton;
        private System.Windows.Forms.Panel navbarPanel;

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
            this.welcomeLabel = new System.Windows.Forms.Label();
            this.createObjectButton = new System.Windows.Forms.Button();
            this.listObjectButton = new System.Windows.Forms.Button();
            this.listOtherObjectsButton = new System.Windows.Forms.Button();
            this.navbarPanel = new System.Windows.Forms.Panel();
            this.navbarPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // welcomeLabel
            // 
            this.welcomeLabel.AutoSize = true;
            this.welcomeLabel.Font = new System.Drawing.Font("Arial", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.welcomeLabel.Location = new System.Drawing.Point(15, 65);
            this.welcomeLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.welcomeLabel.Name = "welcomeLabel";
            this.welcomeLabel.Size = new System.Drawing.Size(109, 22);
            this.welcomeLabel.TabIndex = 1;
            this.welcomeLabel.Text = "Bienvenue";
            // 
            // createObjectButton
            // 
            this.createObjectButton.BackColor = System.Drawing.Color.White;
            this.createObjectButton.ForeColor = System.Drawing.Color.Brown;
            this.createObjectButton.Location = new System.Drawing.Point(15, 12);
            this.createObjectButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.createObjectButton.Name = "createObjectButton";
            this.createObjectButton.Size = new System.Drawing.Size(112, 24);
            this.createObjectButton.TabIndex = 1;
            this.createObjectButton.Text = "Création d\'objet";
            this.createObjectButton.UseVisualStyleBackColor = false;
            this.createObjectButton.Click += new System.EventHandler(this.CreateObjectButton_Click);
            // 
            // listObjectButton
            // 
            this.listObjectButton.BackColor = System.Drawing.Color.White;
            this.listObjectButton.ForeColor = System.Drawing.Color.Brown;
            this.listObjectButton.Location = new System.Drawing.Point(135, 12);
            this.listObjectButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.listObjectButton.Name = "listObjectButton";
            this.listObjectButton.Size = new System.Drawing.Size(112, 24);
            this.listObjectButton.TabIndex = 2;
            this.listObjectButton.Text = "Liste de mes objets";
            this.listObjectButton.UseVisualStyleBackColor = false;
            this.listObjectButton.Click += new System.EventHandler(this.ListObjectsButton_Click);

            this.listOtherObjectsButton.BackColor = System.Drawing.Color.White;
            this.listOtherObjectsButton.ForeColor = System.Drawing.Color.Brown;
            this.listOtherObjectsButton.Location = new System.Drawing.Point(255, 12);
            this.listOtherObjectsButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.listOtherObjectsButton.Name = "listOtherObjectsButton";
            this.listOtherObjectsButton.Size = new System.Drawing.Size(112, 24);
            this.listOtherObjectsButton.TabIndex = 3;
            this.listOtherObjectsButton.Text = "Objets autres utilisateurs";
            this.listOtherObjectsButton.UseVisualStyleBackColor = false;
            this.listOtherObjectsButton.Click += new System.EventHandler(this.ListOtherObjectsButton_Click);
            this.navbarPanel.Controls.Add(this.listOtherObjectsButton);
            // 
            // navbarPanel
            // 
            this.navbarPanel.BackColor = System.Drawing.Color.Brown;
            this.navbarPanel.Controls.Add(this.createObjectButton);
            this.navbarPanel.Controls.Add(this.listObjectButton);
            this.navbarPanel.Dock = System.Windows.Forms.DockStyle.Top;
            this.navbarPanel.Location = new System.Drawing.Point(0, 0);
            this.navbarPanel.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.navbarPanel.Name = "navbarPanel";
            this.navbarPanel.Size = new System.Drawing.Size(600, 49);
            this.navbarPanel.TabIndex = 0;
            // 
            // HomePage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(600, 366);
            this.Controls.Add(this.welcomeLabel);
            this.Controls.Add(this.navbarPanel);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "HomePage";
            this.Text = "Page d\'accueil";
            this.Load += new System.EventHandler(this.HomePage_Load);
            this.navbarPanel.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

    }
}