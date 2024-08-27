namespace WindowsFormsApp
{
    partial class HomePage
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.Label welcomeLabel;
        private System.Windows.Forms.Button createObjectButton;
        private System.Windows.Forms.Button listObjectButton;
        private System.Windows.Forms.Button listOtherObjectsButton;
        private System.Windows.Forms.Button exchangeButton;
        private System.Windows.Forms.Button listWishButton;
        private System.Windows.Forms.Button listProposedExchangesButton;
        private System.Windows.Forms.Button viewHistoryButton; // Nouveau bouton pour l'historique des échanges
        private System.Windows.Forms.Button logoutButton;
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
            this.exchangeButton = new System.Windows.Forms.Button();
            this.listWishButton = new System.Windows.Forms.Button();
            this.listProposedExchangesButton = new System.Windows.Forms.Button();
            this.viewHistoryButton = new System.Windows.Forms.Button();
            this.navbarPanel = new System.Windows.Forms.Panel();
            this.logoutButton = new System.Windows.Forms.Button();
            this.navbarPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // welcomeLabel
            // 
            this.welcomeLabel.AutoSize = true;
            this.welcomeLabel.Font = new System.Drawing.Font("Arial", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.welcomeLabel.Location = new System.Drawing.Point(432, 97);
            this.welcomeLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.welcomeLabel.Name = "welcomeLabel";
            this.welcomeLabel.Size = new System.Drawing.Size(109, 22);
            this.welcomeLabel.TabIndex = 1;
            this.welcomeLabel.Text = "Bienvenue";
            // 
            // createObjectButton
            // 
            this.createObjectButton.BackColor = System.Drawing.Color.White;
            this.createObjectButton.ForeColor = System.Drawing.Color.Purple;
            this.createObjectButton.Location = new System.Drawing.Point(15, 12);
            this.createObjectButton.Margin = new System.Windows.Forms.Padding(2);
            this.createObjectButton.Name = "createObjectButton";
            this.createObjectButton.Size = new System.Drawing.Size(112, 37);
            this.createObjectButton.TabIndex = 1;
            this.createObjectButton.Text = "Création d\'objet";
            this.createObjectButton.UseVisualStyleBackColor = false;
            this.createObjectButton.Click += new System.EventHandler(this.CreateObjectButton_Click);
            // 
            // listObjectButton
            // 
            this.listObjectButton.BackColor = System.Drawing.Color.White;
            this.listObjectButton.ForeColor = System.Drawing.Color.Purple;
            this.listObjectButton.Location = new System.Drawing.Point(135, 12);
            this.listObjectButton.Margin = new System.Windows.Forms.Padding(2);
            this.listObjectButton.Name = "listObjectButton";
            this.listObjectButton.Size = new System.Drawing.Size(112, 37);
            this.listObjectButton.TabIndex = 2;
            this.listObjectButton.Text = "Liste de mes objets";
            this.listObjectButton.UseVisualStyleBackColor = false;
            this.listObjectButton.Click += new System.EventHandler(this.ListObjectsButton_Click);
            // 
            // listOtherObjectsButton
            // 
            this.listOtherObjectsButton.BackColor = System.Drawing.Color.White;
            this.listOtherObjectsButton.ForeColor = System.Drawing.Color.Brown;
            this.listOtherObjectsButton.Location = new System.Drawing.Point(255, 12);
            this.listOtherObjectsButton.Margin = new System.Windows.Forms.Padding(2);
            this.listOtherObjectsButton.Name = "listOtherObjectsButton";
            this.listOtherObjectsButton.Size = new System.Drawing.Size(112, 37);
            this.listOtherObjectsButton.TabIndex = 3;
            this.listOtherObjectsButton.Text = "Objets autres utilisateurs";
            this.listOtherObjectsButton.UseVisualStyleBackColor = false;
            this.listOtherObjectsButton.Click += new System.EventHandler(this.ListOtherObjectsButton_Click);
            // 
            // exchangeButton
            // 
            this.exchangeButton.BackColor = System.Drawing.Color.White;
            this.exchangeButton.ForeColor = System.Drawing.Color.Brown;
            this.exchangeButton.Location = new System.Drawing.Point(375, 12);
            this.exchangeButton.Margin = new System.Windows.Forms.Padding(2);
            this.exchangeButton.Name = "exchangeButton";
            this.exchangeButton.Size = new System.Drawing.Size(112, 37);
            this.exchangeButton.TabIndex = 4;
            this.exchangeButton.Text = "Échanger objets";
            this.exchangeButton.UseVisualStyleBackColor = false;
            this.exchangeButton.Click += new System.EventHandler(this.ExchangeButton_Click);
            // 
            // listWishButton
            // 
            this.listWishButton.BackColor = System.Drawing.Color.White;
            this.listWishButton.ForeColor = System.Drawing.Color.Brown;
            this.listWishButton.Location = new System.Drawing.Point(495, 12);
            this.listWishButton.Margin = new System.Windows.Forms.Padding(2);
            this.listWishButton.Name = "listWishButton";
            this.listWishButton.Size = new System.Drawing.Size(112, 37);
            this.listWishButton.TabIndex = 5;
            this.listWishButton.Text = "Listes des souhaits";
            this.listWishButton.UseVisualStyleBackColor = false;
            this.listWishButton.Click += new System.EventHandler(this.ListWishButton_Click);
            // 
            // listProposedExchangesButton
            // 
            this.listProposedExchangesButton.BackColor = System.Drawing.Color.White;
            this.listProposedExchangesButton.ForeColor = System.Drawing.Color.Brown;
            this.listProposedExchangesButton.Location = new System.Drawing.Point(615, 12);
            this.listProposedExchangesButton.Margin = new System.Windows.Forms.Padding(2);
            this.listProposedExchangesButton.Name = "listProposedExchangesButton";
            this.listProposedExchangesButton.Size = new System.Drawing.Size(112, 37);
            this.listProposedExchangesButton.TabIndex = 6;
            this.listProposedExchangesButton.Text = "Échanges proposés";
            this.listProposedExchangesButton.UseVisualStyleBackColor = false;
            this.listProposedExchangesButton.Click += new System.EventHandler(this.ListProposedExchangesButton_Click);
            // 
            // viewHistoryButton
            // 
            this.viewHistoryButton.BackColor = System.Drawing.Color.White;
            this.viewHistoryButton.ForeColor = System.Drawing.Color.Brown;
            this.viewHistoryButton.Location = new System.Drawing.Point(735, 12);
            this.viewHistoryButton.Margin = new System.Windows.Forms.Padding(2);
            this.viewHistoryButton.Name = "viewHistoryButton";
            this.viewHistoryButton.Size = new System.Drawing.Size(112, 37);
            this.viewHistoryButton.TabIndex = 7;
            this.viewHistoryButton.Text = "Historique";
            this.viewHistoryButton.UseVisualStyleBackColor = false;
            this.viewHistoryButton.Click += new System.EventHandler(this.ViewHistoryButton_Click);
            // 
            // navbarPanel
            // 
            this.navbarPanel.BackColor = System.Drawing.Color.Purple;
            this.navbarPanel.Controls.Add(this.createObjectButton);
            this.navbarPanel.Controls.Add(this.listObjectButton);
            this.navbarPanel.Controls.Add(this.listOtherObjectsButton);
            this.navbarPanel.Controls.Add(this.exchangeButton);
            this.navbarPanel.Controls.Add(this.listWishButton);
            this.navbarPanel.Controls.Add(this.listProposedExchangesButton);
            this.navbarPanel.Controls.Add(this.viewHistoryButton);
            this.navbarPanel.Controls.Add(this.logoutButton);
            this.navbarPanel.Dock = System.Windows.Forms.DockStyle.Top;
            this.navbarPanel.Location = new System.Drawing.Point(0, 0);
            this.navbarPanel.Margin = new System.Windows.Forms.Padding(2);
            this.navbarPanel.Name = "navbarPanel";
            this.navbarPanel.Size = new System.Drawing.Size(1063, 63);
            this.navbarPanel.TabIndex = 0;
            this.navbarPanel.Paint += new System.Windows.Forms.PaintEventHandler(this.navbarPanel_Paint);
            // 
            // logoutButton
            // 
            this.logoutButton.BackColor = System.Drawing.Color.White;
            this.logoutButton.ForeColor = System.Drawing.Color.Brown;
            this.logoutButton.Location = new System.Drawing.Point(940, 11);
            this.logoutButton.Margin = new System.Windows.Forms.Padding(2);
            this.logoutButton.Name = "logoutButton";
            this.logoutButton.Size = new System.Drawing.Size(112, 37);
            this.logoutButton.TabIndex = 8;
            this.logoutButton.Text = "Déconnexion";
            this.logoutButton.UseVisualStyleBackColor = false;
            this.logoutButton.Click += new System.EventHandler(this.LogoutButton_Click);
            // 
            // HomePage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1063, 400);
            this.Controls.Add(this.welcomeLabel);
            this.Controls.Add(this.navbarPanel);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "HomePage";
            this.Text = "Page d\'accueil";
            this.Load += new System.EventHandler(this.HomePage_Load);
            this.navbarPanel.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }


    }
}