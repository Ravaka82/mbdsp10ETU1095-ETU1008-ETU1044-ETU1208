using System.Windows.Forms;

namespace WindowsFormsApp
{
    partial class ListOtherObjectsForm
    {
        private System.ComponentModel.IContainer components = null;
        private Panel otherObjectsPanel;  // Ajout d'un Panel pour les objets

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
            this.otherObjectsPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // otherObjectsPanel
            // 
            this.otherObjectsPanel.AutoScroll = true;
            this.otherObjectsPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.otherObjectsPanel.Location = new System.Drawing.Point(0, 0);
            this.otherObjectsPanel.Margin = new System.Windows.Forms.Padding(2);
            this.otherObjectsPanel.Name = "otherObjectsPanel";
            this.otherObjectsPanel.Padding = new System.Windows.Forms.Padding(8);
            this.otherObjectsPanel.Size = new System.Drawing.Size(800, 600);
            this.otherObjectsPanel.TabIndex = 0;
            this.otherObjectsPanel.Paint += new System.Windows.Forms.PaintEventHandler(this.otherObjectsPanel_Paint);
            // 
            // ListOtherObjectsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 600);
            this.Controls.Add(this.otherObjectsPanel);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "ListOtherObjectsForm";
            this.Text = "Objets des autres utilisateurs";
            this.Load += new System.EventHandler(this.ListOtherObjectsForm_Load);
            this.ResumeLayout(false);

        }
    }
}
