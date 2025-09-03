import React from "react";

export const MembershipRequest = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white min-h-screen py-8">
            {/* Sanskriti Logo - Horizontally Centered */}
            <div className="text-center mb-8">
                <img 
                    src="/images/logo.png" 
                    alt="Sanskriti e.V. Logo" 
                    className="mx-auto h-40 w-40 md:h-56 md:w-56 rounded-full cursor-pointer shadow-lg"
                    onClick={() => window.location.href = '/'} 
                />
            </div>

            {/* Heading Section */}
            <div className="w-full max-w-4xl px-4 mb-8">
                <div className="text-center">
                    {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Welcome to Sanskriti Hamburg
                    </h1> */}
                    <p className="text-md md:text-md text-gray-500 max-w-3xl mx-auto">
                        Sanskriti Hamburg is a community-led cultural initiative celebrating Indian traditions, creativity, and togetherness.
                        We believe in inclusion, collaboration, and the joy of shared heritage.
                    </p>
                    <br />
                    <p className="text-md md:text-md text-gray-500 max-w-3xl mx-auto">
                        If you’re interested in becoming part of this growing cultural community, we warmly welcome you to express your interest in membership using the form below.
                    </p>
                </div>
            </div>

            {/* Benefits and Form Section - Side by Side */}
            <div className="w-full max-w-7xl px-4 mb-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Benefits Section - Left Side */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                            Why Become a Committee Member?
                        </h2>
                        
                        {/* Benefits Table */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-lg">
                                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Multicultural Community</h3>
                                    <p className="text-gray-600 text-sm">Join a vibrant, multicultural community rooted in Indian heritage</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-lg">
                                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Cultural Events</h3>
                                    <p className="text-gray-600 text-sm">Help organize and participate in events like Durga Puja, Diwali, and cultural workshops</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-lg">
                                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Exclusive Access</h3>
                                    <p className="text-gray-600 text-sm">Access exclusive member-only planning and networking activities</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-lg">
                                <div className="bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Celebrate & Connect</h3>
                                    <p className="text-gray-600 text-sm">Celebrate your roots while building lasting friendships in Hamburg</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-3 bg-white/50 rounded-lg">
                                <div className="bg-red-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Cultural Voice</h3>
                                    <p className="text-gray-600 text-sm">Take part in shaping the cultural voice of the Indian diaspora in Northern Germany</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form Section - Right Side */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                Express Your Interest
                            </h2>
                            <p className="text-xs text-gray-600">
                                Fill out the form below to express your interest in joining our committee.
                            </p>
                        </div>
                        
                        {/* Zoho Form Embed */}
                        <div className="w-full">
                            <iframe 
                                aria-label='Membership Interest Form' 
                                frameBorder="0" 
                                style={{height:'500px', width:'100%', border:'none'}} 
                                src='https://forms.zohopublic.eu/snskrtihamgm1/form/SimpleMembershipRegistrationForm/formperma/XmtE-270PQ6GXOVrv-g7aXihT3sQz4aPSct3-TLePoo'
                                title="Committee Membership Interest Form"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* Footer Information */}
            <div className="w-full max-w-4xl px-4 mt-8">
                <div className="text-center text-gray-500 text-sm">
                    <p>For questions about committee membership, please contact us at admin@sanskriti-hamburg.de</p>
                </div>
            </div>
        </div>
    );
}
