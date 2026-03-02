import { Home } from 'lucide-react';

interface OpenAccessPolicyProps {
  onNavigateHome: () => void;
}

export default function OpenAccessPolicy({ onNavigateHome }: OpenAccessPolicyProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button onClick={onNavigateHome} className="flex items-center gap-1 hover:text-[#4195A3] transition-colors">
          <Home size={16} className="text-[#4195A3]" />
          <span className="text-[#4195A3]">HOME</span>
        </button>
        <span>/</span>
        <span>Open Access Policy</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Open Access Policy
      </h2>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <p className="mb-4">
            Croatian Medical Journal is committed to promoting the wide dissemination of high-quality scientific research in clinical medicine, biomedical sciences, and healthcare. In response to the evolving dynamics of scholarly communication and the growing global demand for unrestricted access to research findings, the journal has transitioned from a traditional subscription-based publishing model to a fully Open Access (OA) format.
          </p>
          <p className="mb-4">
            This strategic development underscores the journal&apos;s dedication to advancing equitable access to scientific knowledge and supporting the global exchange of research. By adopting a full Open Access model, the Croatian Medical Journal ensures that all published content is immediately and freely accessible to readers worldwide, without financial, legal, or technical barriers. This approach significantly benefits researchers, healthcare professionals, policymakers, and academic institutions—particularly those in low- and middle-income regions—who may otherwise face limitations in accessing subscription-based resources.
          </p>
          <p className="mb-4">
            Under the Open Access policy, all articles are published under the terms of the Creative Commons Attribution 4.0 International (CC BY 4.0) license. This license permits unrestricted use, distribution, reproduction, and adaptation of the work in any medium, including for commercial purposes, provided appropriate credit is given to the original authors and source. The CC BY 4.0 license represents one of the most flexible and widely recognized open-access licensing frameworks, facilitating maximum visibility, dissemination, and scholarly impact of published research.
          </p>
        </section>

        <section>
          <p className="mb-4">
            By enabling free access and liberal reusability, the journal seeks to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Enhance the global visibility and impact of research published in Croatian Medical Journal.</li>
            <li>Promote collaboration across disciplines and borders.</li>
            <li>Accelerate scientific discovery and clinical innovation.</li>
            <li>Support evidence-based healthcare practices worldwide.</li>
          </ul>
          <p>
            Authors who publish in Croatian Medical Journal retain the copyright to their work. However, they grant the journal the right to publish and distribute their article under the terms of the Creative Commons license. This approach fosters transparency and integrity in the publishing process, while empowering authors with broader control over how their work is accessed and used.
          </p>
        </section>

        <section>
          <p>
            To sustain the costs associated with high-quality Open Access publishing, including editorial processing, peer review, digital archiving, and platform maintenance, the journal applies an Article Processing Charge (APC). These charges are typically covered by the author&apos;s institution, research funders, or through personal funds. Importantly, Croatian Medical Journal remains committed to affordability and may offer waivers or discounts to authors from low-income or lower-middle-income countries, in accordance with its mission to support inclusive publishing.
          </p>
        </section>

        <section>
          <p>
            All submitted manuscripts continue to undergo rigorous peer review through the journal&apos;s established double-blind process, which ensures impartiality and maintains high editorial standards. Transitioning to Open Access has not altered the scholarly integrity of Croatian Medical Journal—instead, it enhances transparency by making peer-reviewed content immediately accessible to the broader scientific community.
          </p>
        </section>

        <section>
          <p>
            In summary, the shift to Open Access allows Croatian Medical Journal to better fulfill its mission: to serve as a platform for the dissemination of clinically relevant, high-quality research that informs medical practice and contributes to the advancement of human health. We invite scholars, clinicians, and researchers from all over the world to submit their work, confident that their contributions will reach the widest possible audience—unrestricted and universally accessible.
          </p>
        </section>
      </div>
    </div>
  );
}
