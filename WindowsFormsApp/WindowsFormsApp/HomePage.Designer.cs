namespace WindowsFormsApp
{
    partial class HomePage
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.Label welcomeLabel;
        private System.Windows.Forms.Button createObjectButton;
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
            this.components = new System.ComponentModel.Container();
            this.welcomeLabel = new System.Windows.Forms.Label();
            this.createObjectButton = new System.Windows.Forms.Button();
            this.navbarPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();

            // 
            // navbarPanel
            // 
            this.navbarPanel.BackColor = System.Drawing.Color.Brown;
            this.navbarPanel.Controls.Add(this.createObjectButton);
            this.navbarPanel.Dock = System.Windows.Forms.DockStyle.Top;
            this.navbarPanel.Height = 60;
            this.navbarPanel.Location = new System.Drawing.Point(0, 0);
            this.navbarPanel.Name = "navbarPanel";
            this.navbarPanel.Size = new System.Drawing.Size(800, 60);
            this.navbarPanel.TabIndex = 0;

            // 
            // createObjectButton
            // 
            this.createObjectButton.BackColor = System.Drawing.Color.White;
            this.createObjectButton.ForeColor = System.Drawing.Color.Brown;
            this.createObjectButton.Location = new System.Drawing.Point(20, 15);
            this.createObjectButton.Name = "createObjectButton";
            this.createObjectButton.Size = new System.Drawing.Size(150, 30);
            this.createObjectButton.TabIndex = 1;
            this.createObjectButton.Text = "Création d'objet";
            this.createObjectButton.UseVisualStyleBackColor = false;
            this.createObjectButton.Click += new System.EventHandler(this.CreateObjectButton_Click);

            // 
            // welcomeLabel
            // 
            this.welcomeLabel.AutoSize = true;
            this.welcomeLabel.Font = new System.Drawing.Font("Arial", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.welcomeLabel.Location = new System.Drawing.Point(20, 80);
            this.welcomeLabel.Name = "welcomeLabel";
            this.welcomeLabel.Size = new System.Drawing.Size(100, 22);
            this.welcomeLabel.TabIndex = 1;
            this.welcomeLabel.Text = "Bienvenue";

            // 
            // HomePage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.welcomeLabel);
            this.Controls.Add(this.navbarPanel);
            this.Name = "HomePage";
            this.Text = "Page d'accueil";
            this.ResumeLayout(false);
            this.PerformLayout();
        }
    }
}
