namespace WindowsFormsApp
{
    partial class ViewHistoryForm
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.Panel listPanel;

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
            this.listPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // listPanel
            // 
            this.listPanel.AutoScroll = true;
            this.listPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listPanel.Location = new System.Drawing.Point(0, 0);
            this.listPanel.Name = "listPanel";
            this.listPanel.Padding = new System.Windows.Forms.Padding(10);
            this.listPanel.Size = new System.Drawing.Size(800, 600);
            this.listPanel.TabIndex = 0;
            this.listPanel.Paint += new System.Windows.Forms.PaintEventHandler(this.listPanel_Paint);
            // 
            // ViewHistoryForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 600);
            this.Controls.Add(this.listPanel);
            this.Name = "ViewHistoryForm";
            this.Text = "Historique des échanges";
            this.Load += new System.EventHandler(this.ViewHistoryForm_Load);
            this.ResumeLayout(false);



        }
    }
}
