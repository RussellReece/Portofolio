'use client';

import Image from 'next/image';
import { FileText, ExternalLink } from 'lucide-react';

const certificates = [
  { name: 'BNEC x HIMTI - From Campus to Career', file: 'BNEC X HIMTI —From Campus To Career A Journey Into The IT World.pdf', type: 'pdf' },
  { name: 'DIGICOFEST 2024', file: 'Digcofest 2024.pdf', type: 'pdf' },
  { name: 'Freshmen Program 2024', file: 'Freshmen Program 2024 Satu University.jpg', type: 'image' },
  { name: 'GEM 2025', file: 'GEM 2025.jpg', type: 'image' },
  { name: 'Meet Rector Satu University', file: 'Meet Rector Satu University.jpg', type: 'image' },
  { name: 'NBPC 2025', file: 'NBPC 2025 Russell Reece.pdf', type: 'pdf' },
  { name: 'Azure AI Basic Fundamentals', file: 'Pelatihan Azure AI Basic Fundamentals - Russell Reece.pdf', type: 'pdf' },
  { name: 'Logicodix 2025', file: 'Russell Reece Logicodix.png', type: 'image' },
  { name: 'PKM 2025 Competition', file: 'Sertifikast lomba PKM Russell Reece Satu University.png', type: 'image' },
  { name: 'BCA Certification', file: 'Sertifikat BCA Russell Reece.pdf', type: 'pdf' },
  { name: 'Satu Technovation 2026 Committee', file: 'Sertifikat Panitia-Russell Reece SatuTechnovation 2026.pdf', type: 'pdf' },
  { name: 'PKM 2025', file: 'Sertifkat PKM Russell Reece.pdf', type: 'pdf' },
  { name: 'Communication Skills Trainee', file: 'Trainee Communication Skill Satu University.png', type: 'image' },
  { name: 'Leadership Trainee', file: 'Trainee Leadership Satu University.png', type: 'image' },
  { name: 'GEM Webinar', file: 'Webinar GEM.jpg', type: 'image' },
] as const;

const assetUrl = (file: string) => `/assets/certificates/${encodeURIComponent(file)}`;

export default function CertificateGallery({ lang }: { lang: string }) {
  return (
    <section id="certificates" className="relative py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">{lang === 'id' ? 'Dokumentasi' : 'Documentation'}</p>
          <h2 className="text-3xl font-bold md:text-4xl">{lang === 'id' ? 'Gallery Sertifikat' : 'Certificate Gallery'}</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((certificate) => {
            const url = assetUrl(certificate.file);
            return (
              <a key={certificate.file} href={url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-gray-200/70 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900">
                  {certificate.type === 'image' ? (
                    <Image src={url} alt={certificate.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 240px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <FileText className="h-12 w-12 text-primary/70" aria-hidden="true" />
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"><ExternalLink className="h-3.5 w-3.5" /></span>
                </div>
                <div className="flex min-h-16 items-center justify-between gap-3 p-4">
                  <span className="text-sm font-semibold leading-tight">{certificate.name}</span>
                  <span className="text-xs text-gray-500">{certificate.type.toUpperCase()}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
