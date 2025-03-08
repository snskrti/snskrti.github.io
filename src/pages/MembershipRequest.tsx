import { AlertCircle } from "lucide-react";
import React from "react"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const MembershipRequest= () => {

    const [name, setName] = React.useState('');
    const [emailAddress, setEmailAddress] = React.useState('');
    const [residentialAddress, setResidentialAddress] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const generatePDF = async (): Promise<File> => {
        console.log("generate pdf ....");

        const container = document.createElement('div');

        document.body.appendChild(container);
        container.innerHTML = `
                <div class="flex flex-col m-32">
                    <div class="text-left my-16">
                        <p>Sanskriti e.V. <br>Rellinger Weg 22, <br>22457 Hamburg</p>
                    </div>
                    <div class="text-left my-16">
                        <p class="font-bold">Antrag auf Mitgliedschaft</p>
                    </div>
                    <div class="text-left">
                        <div>Sehr heehrte Damen und Herren, <br><br>
                            Hiermit beantrage ich die Mitgliedschaft im Verein Sanskriti e.V.
                            <div class="my-4 flex mt-8 ml-4">
                                <b>Name, Vorname:</b> &nbsp;<p>${name}</p>
                            </div>
                            <div class="my-4 flex mt-8 ml-4">
                                <b>Anscrift:</b> &nbsp;<p>${emailAddress}</p>
                            </div>
                            <div class="my-4 flex mt-8 ml-4">
                                <b>Anscrift:</b> &nbsp;<p>${residentialAddress}</p>
                            </div>
                            <p class="my-8">Ich akzeptiere die Bedingungen einer Mitgliedschaft im Sanskriti e.V. und möchte an den Aktivitäten des Vereins teilnehmen und diesen mitgestalten.</p>
                            <p class="my-12">Mit freundlichen Grüßen,</p>
                            <div class="my-32">
                                <p>.................................................................</p>
                                <p>Datum / Unterschrift</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;

        // Wait for the container to be appended to the document and visible
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            // Convert HTML to canvas
            const canvas = await html2canvas(container);

            console.log('canvas:', canvas);
            
            // Convert the HTML content to an image
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 190;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, "JPEG", 10, 10, 180, 0);

            pdf.save('sanskriti_membership_request.pdf');

            const pdfBlob = pdf.output('blob');

            console.log("PDF Blob:", pdfBlob);
            // Download the PDF
            return new File([pdfBlob], 'sanskriti_membership_request.pdf', { type: 'application/pdf' });
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            document.body.removeChild(container);
        }
    }

    const handleSubmitStopped = async() => {
        alert("Registrations are currently closed. Please get in touch with the Verein by Email / Phone for more information.");
    };

    const handleSubmit = async() => {
        setLoading(true);

        const pdfFile = await generatePDF();
        console.log("pdf size = ", pdfFile.size);
        
        const url = URL.createObjectURL(pdfFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sanskriti_membership_request.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <div className="w-full max-w-md md:max-w-2xl space-y-8 p-8 bg-surface rounded-xl border border-border">      
            <div className="text-center">
                <img src="/images/logo.png" alt="Membership Request" 
                    className="mx-auto h-64 w-64 rounded-full cursor-pointer"
                    onClick={() => window.location.href = '/'} />
                <h2 className="mt-6 text-3xl font-bold text-text">Membership Request</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                <div>
                    <div className="mt-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <p className="text-xs text-orange-700">
                        Please fill in the form below to apply for membership. 
                        <br />
                        On submission, a PDF of the membership form will be generated and downloaded to your device. 
                        Please print, sign and send the form to the Verein's office, by post. The Verein will verify the membership request and get back to you.
                        <br />
                        We are legally obliged to have your membership request in writing, with your signature.
                    </p>
                    </div>
                </div>
                </div>  
            </div>
            {/*  form entry */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmitStopped}>
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text">
                    Your Name
                    </label>
                    <input
                    id="text"
                    type="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 px-4 py-2 block w-full border rounded-lg border-border bg-surface text-text shadow-sm focus:border-primary focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text">
                    Your Email Address
                    </label>
                    <input
                        id="emailAddress"
                        type="emailAddress"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="mt-1 px-4 py-2 block w-full border rounded-lg border-border bg-surface text-text shadow-sm focus:border-primary focus:ring-primary"
                    />
                </div>
                
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-text">
                    Your Residential Address
                    </label>
                    <input
                    id="address"
                    type="text"
                    required
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    className="mt-1 px-4 py-2 block w-full border rounded-lg border-border bg-surface text-text shadow-sm focus:border-primary focus:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background disabled:opacity-50"
                    >
                    {loading ? 'Registering...' : 'Apply for Membership'}
                </button>
                </div>
            </form>
            </div>

        </div>
    )
}
