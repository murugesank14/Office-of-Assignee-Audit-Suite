
import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

const guideContent = [
  {
    title: 'Core Legislation',
    items: [
      {
        name: 'Presidency Towns Insolvency Act, 1909',
        description: 'Governs insolvency proceedings within the jurisdiction of former Presidency Towns (i.e., Chennai).',
        keySections: 'Sec 17 (Vesting of Property), Sec 52 (Duties of Official Assignee), Sec 59-63 (Realisation & Distribution), Sec 105-110 (Accounts & Registers).',
        auditorFocus: 'Verify that all actions within Chennai jurisdiction strictly adhere to this Act. Pay close attention to vesting orders, procedures for asset sales, and the prescribed method for maintaining accounts.',
        crossReference: 'Insolvency Petition Register, Sale Register, Estate Ledger (Chennai cases).'
      },
      {
        name: 'Provincial Insolvency Act, 1920',
        description: 'The primary legislation governing insolvency proceedings in all districts of Tamil Nadu outside the Chennai metropolitan jurisdiction.',
        keySections: 'Sec 20 & 28 (Vesting & Powers of Receiver), Sec 56 & 59 (Control over Receiver, Sale of Property), Sec 61-68 (Proof of Debts, Distribution), Sec 70-76 (Accounts).',
        auditorFocus: 'This is the core Act for most district-level audits. Every step, from adjudication to estate closure, must be cross-verified against its provisions. Ensure creditor ranking and distribution align with Section 61.',
        crossReference: 'All statutory registers (e.g., Inventory, Claims, Distribution, Estate Ledger).'
      }
    ]
  },
  {
    title: 'Procedures & Rules',
    items: [
      {
        name: 'Civil Courts Practice & Procedure',
        description: 'Provides the procedural framework for all interactions with the Insolvency Court, including filing petitions and executing orders.',
        keySections: 'Order 21 of CPC (Execution of Decrees/Orders), Civil Rules of Practice.',
        auditorFocus: 'Confirm that all court orders (for asset seizure, sale, eviction, etc.) were properly filed for, obtained, and executed according to the CPC. Check for timely compliance and filing of execution reports.',
        crossReference: 'Court Order Register, Litigation Register, Sale Minutes, Mahazar/Seizure Memo.'
      },
      {
        name: 'Tamil Nadu Government Administrative Rules',
        description: 'Includes standing orders and instructions from the Finance Department (e.g., TN Financial Code, Records Manual) governing office administration.',
        keySections: 'Rules on cash handling, record retention schedules, maintenance of pre-numbered registers, and procedures for government auctions.',
        auditorFocus: 'Verify that the office administration demonstrates financial propriety. Check for daily cash book reconciliation, proper use and custody of receipt books, and adherence to record archival rules.',
        crossReference: 'Cash Book, Receipt Books, Attendance Register, Record Room Index.'
      },
      {
        name: 'Government Orders (GOs)',
        description: 'Specific directives issued by the government that clarify or modify existing rules for estate administration.',
        keySections: 'Varies by GO.',
        auditorFocus: 'Ensure any relevant GOs applicable during the audit period have been complied with. Check for GOs related to auction procedures, staff conduct, or financial reporting.',
        crossReference: 'All Registers, Case Files.'
      }
    ]
  },
  {
    title: 'Audit Resources & Templates',
    items: [
       {
        name: 'Model Audit Paras',
        description: 'Standard templates for common audit objections and positive findings. Provides structured language for drafting reports.',
        keySections: 'N/A',
        auditorFocus: 'Use as a reference for drafting clear, concise, and audit-compliant paragraphs. Ensures uniformity in reporting.',
        crossReference: 'AI Assistant, Report Generation module.'
      },
      {
        name: 'Model Audit Reports',
        description: 'Complete sample audit reports that demonstrate the expected structure, tone, and content for final submission.',
        keySections: 'N/A',
        auditorFocus: 'Follow the model structure for compiling the final audit report, including preliminary sections, detailed paragraphs, and summary.',
        crossReference: 'Report Generation module.'
      },
       {
        name: 'Audit Check Points',
        description: 'Comprehensive checklists for verifying each of the 12 core functions of the Official Receiver.',
        keySections: 'N/A',
        auditorFocus: 'Ensure no critical verification step is missed during fieldwork or desk audit. Use as a guide for planning the audit scope.',
        crossReference: 'Audit Planning, Fieldwork modules.'
      }
    ]
  },
    {
    title: 'Organisational Information',
    items: [
      {
        name: 'Organisation Structure',
        description: 'Defines the hierarchy and roles within the Office of the Official Assignee/Receiver, from the Receiver to the assistants and clerks.',
        keySections: 'Roles of Official Receiver (OR), Superintendent, Assistants, Record Clerk.',
        auditorFocus: 'Understand the delegation of duties to assess whether actions were performed by authorized personnel. Verify that register entries are authenticated by the appropriate staff.',
        crossReference: 'All Registers (for signatures/initials), Staff Attendance.'
      }
    ]
  }
];

const AuditGuide: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setActiveAccordion(activeAccordion === title ? null : title);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition border border-gray-200"
      >
        <BookOpen size={18} className="text-indigo-600" />
        <span className="font-semibold text-sm text-gray-700">Audit Guide</span>
        <ChevronDown size={16} className={`text-gray-500 transform transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div 
          className="absolute mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 origin-top-right right-0"
          onMouseLeave={() => setOpen(false)}
        >
          <h3 className="font-bold text-gray-800 mb-3 text-base">Audit Reference Library</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {guideContent.map((section) => (
              <div key={section.title} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleAccordion(section.title)}
                  className="w-full flex justify-between items-center p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <span>{section.title}</span>
                  <ChevronRight size={16} className={`transform transition-transform ${activeAccordion === section.title ? "rotate-90" : ""}`} />
                </button>
                {activeAccordion === section.title && (
                  <div className="p-2 space-y-3">
                    {section.items.map((item) => (
                      <div key={item.name} className="text-xs text-gray-600 border-l-2 border-indigo-200 pl-3">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        {item.description && <p className="mt-1"><span className="font-medium text-gray-700">Description:</span> {item.description}</p>}
                        {item.keySections && <p className="mt-1"><span className="font-medium text-gray-700">Key Sections:</span> {item.keySections}</p>}
                        {item.auditorFocus && <p className="mt-1"><span className="font-medium text-gray-700">Auditor Focus:</span> {item.auditorFocus}</p>}
                        {item.crossReference && <p className="mt-1"><span className="font-medium text-gray-700">Cross-Reference:</span> {item.crossReference}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditGuide;
