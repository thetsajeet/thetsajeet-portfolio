'use client';

import { useEffect, useId, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const diagramId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    async function renderDiagram() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
        const result = await mermaid.render(`blog-mermaid-${diagramId}`, chart);

        if (isCurrent) {
          setSvg(result.svg);
          setError('');
        }
      } catch (renderError) {
        if (isCurrent) {
          setError(renderError instanceof Error ? renderError.message : 'The Mermaid diagram could not be rendered.');
          setSvg('');
        }
      }
    }

    void renderDiagram();

    return () => {
      isCurrent = false;
    };
  }, [chart, diagramId]);

  if (error) {
    return (
      <div className="blog-mermaid-error" role="status">
        <p>Diagram could not be rendered. The Mermaid source is shown below.</p>
        <pre><code className="language-mermaid">{chart}</code></pre>
      </div>
    );
  }

  if (!svg) {
    return <pre className="blog-mermaid-loading"><code className="language-mermaid">{chart}</code></pre>;
  }

  return <div className="blog-mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}
