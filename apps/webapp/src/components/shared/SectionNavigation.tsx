import React, { useEffect, useState } from "react";
import { NavigationSection } from 'types';

export interface SectionNavigationProps {
    activeSection: string;
    sections: NavigationSection[];
}

export const SectionNavigation = ({activeSection, sections}: SectionNavigationProps) => {

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700/50 backdrop-blur-md rounded-full p-4 flex space-x-4 z-50">
            {sections.map(section => (
                <a
                key={section.id}
                href={`#${section.id}`}
                className={`p-2 rounded-full text-white transition-opacity duration-300 ${activeSection === section.id ? 'opacity-100' : 'opacity-50'}`}
                >
                {section.icon}
                </a>
            ))}
        </div>
    );
}