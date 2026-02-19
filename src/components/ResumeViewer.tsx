import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, X } from "lucide-react";
import { useState } from "react";

const ResumeViewer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const resumeUrl = `${import.meta.env.BASE_URL}vivek-resume.pdf`;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="gap-2 border-primary text-primary hover:bg-primary/10"
                >
                    <FileText size={18} />
                    View Resume
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[85vh] p-0 bg-background/95 backdrop-blur-xl border-white/10">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="text-primary" />
                            Resume Preview
                        </h2>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="default" size="sm" className="gap-2">
                                <a href={resumeUrl} download="Vivek_R_Resume.pdf">
                                    <Download size={16} />
                                    Download PDF
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full hover:bg-white/10"
                            >
                                <X size={20} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 bg-white/5 w-full h-full overflow-hidden relative">
                        <iframe
                            src={`${resumeUrl}#toolbar=0`}
                            className="w-full h-full"
                            title="Resume PDF"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ResumeViewer;
