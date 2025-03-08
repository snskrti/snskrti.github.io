import React from "react";

export const DummyPage = () => {
    return (
        <div className="flex flex-col m-32">
            <div className="text-left my-16">
                <p>
                    Sanskriti e.V. <br />
                    Rellinger Weg 22, <br />
                    22457 Hamburg
                </p>
            </div>

            <div className="text-left my-16">
                <p className="font-bold">
                    Antrag auf Mitgliedschaft
                </p>
            </div>

            <div className="text-left">
                <div>
                    Sehr heehrte Damen und Herren, <br /><br />
                    Hiermit beantrage ich die Mitgliedschaft im Verein Sanskriti e.V.
                    
                    <div className="my-4 flex mt-8 ml-4">
                        <b>Name, Vorname:</b> &nbsp; 
                        <p className="">somethign something </p>
                    </div>
                    <div className="my-4 flex mt-8 ml-4">
                        <b>Anscrift:</b> &nbsp; 
                        <p className="">some address somewhere</p>
                    </div>

                    <p className="my-8">
                    Ich akzeptiere die Bedingungen einer Mitgliedschaft im Sanskriti e.V. und möchte an den Aktivitäten des Vereins teilnehmen und diesen mitgestalten.
                    </p>

                    <p className="my-12">
                        Mit freundlichen Grüßen, 

                        <div className="my-32">
                            <p>.................................................................</p>
                            <p>Datum / Unterschrift</p>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
};