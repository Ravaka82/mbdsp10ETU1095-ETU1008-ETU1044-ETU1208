using System.Windows.Forms;

namespace WindowsFormsApp
{
    partial class ListObjectsForm
    {
        private System.ComponentModel.IContainer components = null;
        private Panel cardsPanel;
        private System.Windows.Forms.DataGridView objectsDataGridView;

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
            this.cardsPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();

            // 
            // cardsPanel
            // 
            this.cardsPanel.AutoScroll = true;
            this.cardsPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.cardsPanel.Location = new System.Drawing.Point(0, 0);
            this.cardsPanel.Name = "cardsPanel";
            this.cardsPanel.Padding = new System.Windows.Forms.Padding(10);
            this.cardsPanel.Size = new System.Drawing.Size(800, 450);
            this.cardsPanel.TabIndex = 0;

            // 
            // ListObjectsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.cardsPanel);
            this.Name = "ListObjectsForm";
            this.Text = "Liste des Objets";
            this.ResumeLayout(false);
        }
    }
}