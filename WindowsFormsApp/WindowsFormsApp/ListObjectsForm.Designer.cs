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
            this.cardsPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // cardsPanel
            // 
            this.cardsPanel.AutoScroll = true;
            this.cardsPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.cardsPanel.Location = new System.Drawing.Point(0, 0);
            this.cardsPanel.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.cardsPanel.Name = "cardsPanel";
            this.cardsPanel.Padding = new System.Windows.Forms.Padding(8, 8, 8, 8);
            this.cardsPanel.Size = new System.Drawing.Size(600, 366);
            this.cardsPanel.TabIndex = 0;
            this.cardsPanel.Paint += new System.Windows.Forms.PaintEventHandler(this.cardsPanel_Paint);
            // 
            // ListObjectsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(600, 366);
            this.Controls.Add(this.cardsPanel);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "ListObjectsForm";
            this.Text = "Liste des Objets";
            this.ResumeLayout(false);

        }
    }
}