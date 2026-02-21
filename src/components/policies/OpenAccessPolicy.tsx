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
        <span>Open access policy</span>
      </div>

      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Open access policy
      </h2>

      <div className="space-y-6">
        <section>
          <p className="text-gray-700 leading-relaxed">
            <strong>ACTA CLINICA CROATICA</strong> is dedicated to advancing the dissemination of high-quality
            scientific knowledge in the fields of clinical medical sciences, biomedicine, and healthcare. In
            keeping with the evolving landscape of scholarly publishing and the increasing demand for freely
            accessible research, the journal has recently undergone a significant transition—from a traditional
            subscription-based model to a fully Open Access (OA) publication.
          </p>
        </section>

        <section>
          <p className="text-gray-700 leading-relaxed">
            This transformation reflects our unwavering commitment to global knowledge equity and the
            democratization of scientific information. By adopting an Open Access model, ACTA CLINICA CROATICA
            now ensures that all content published in the journal is freely available to anyone, anywhere in the
            world, without financial, legal, or technical barriers. This change is particularly significant for
            researchers, practitioners, and institutions in resource-limited settings, who previously faced
            restricted access to subscription-based content.
          </p>
        </section>

        <section>
          <p className="text-gray-700 leading-relaxed">
            Under the new Open Access policy, all articles are published under a Creative Commons Attribution
            4.0 International (CC BY 4.0) license. This licensing model allows others to share, copy, distribute,
            and adapt the work—even for commercial purposes—provided the original work is properly cited. The CC
            BY license is the most accommodating of the Creative Commons licenses, ensuring maximum dissemination
            and reuse of open-access materials.
          </p>
        </section>
      </div>
    </div>
  );
}
