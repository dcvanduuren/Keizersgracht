const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Illustration Design System - Keizersgracht Media | Version 3.1</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@300;400;500;600;700&family=Sintony:wght@400;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FAF9F5;
      color: #351E1C;
      font-size: 9.5pt;
      line-height: 1.55;
    }

    .sheet {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      padding: 22mm 24mm 20mm 24mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      position: relative;
      background-color: #FAF9F5;
      overflow: hidden;
    }

    .sheet:last-of-type {
      page-break-after: avoid;
    }

    .sheet-content {
      flex: 1;
    }

    /* Headings */
    .doc-header {
      margin-bottom: 24px;
    }

    .main-title {
      font-family: 'Poppins', sans-serif;
      font-size: 23pt;
      font-weight: 700;
      color: #351E1C;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }

    .main-subtitle {
      font-size: 10pt;
      color: #733635;
      font-weight: 500;
    }

    .section-heading {
      font-family: 'Poppins', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-top: 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .sec-num {
      color: #733635;
    }

    .sec-title {
      color: #351E1C;
    }

    .sub-heading {
      font-size: 10pt;
      font-weight: 600;
      color: #351E1C;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    .sub-caption {
      font-size: 8.5pt;
      color: #733635;
      margin-top: -2px;
      margin-bottom: 10px;
      line-height: 1.4;
    }

    p {
      margin-bottom: 12px;
      color: #351E1C;
      font-size: 9pt;
      line-height: 1.55;
    }

    /* Custom bullet lists */
    ul.bullet-list {
      list-style: none;
      padding-left: 0;
      margin-bottom: 14px;
    }

    ul.bullet-list li {
      position: relative;
      padding-left: 15px;
      margin-bottom: 8px;
      font-size: 9pt;
      line-height: 1.5;
      color: #351E1C;
    }

    ul.bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: -1px;
      color: #351E1C;
      font-size: 11pt;
    }

    ul.bullet-list li strong {
      font-weight: 600;
      color: #351E1C;
    }

    /* Footer */
    .page-footer {
      border-top: 1px solid #ECECDC;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #733635;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    /* Diagram containers on Page 2 */
    .diagram-box {
      width: 100%;
      height: 142px;
      background: #F5F4ED;
      border: 1px solid #ECECDC;
      border-radius: 3px;
      margin: 10px 0 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    /* Table on Page 3 */
    .token-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 20px 0;
      font-size: 9pt;
    }

    .token-table th {
      text-align: left;
      font-size: 8.5pt;
      font-weight: 600;
      color: #733635;
      letter-spacing: 0.04em;
      padding-bottom: 8px;
      border-bottom: 1.5px solid #ECECDC;
    }

    .token-table td {
      padding: 9px 0;
      border-bottom: 1px solid #ECECDC;
      vertical-align: middle;
    }

    .swatch-chip {
      width: 24px;
      height: 24px;
      border-radius: 2px;
      display: inline-block;
      margin-right: 12px;
      vertical-align: middle;
    }

    .token-name {
      font-weight: 600;
      color: #351E1C;
      display: inline-block;
      vertical-align: middle;
    }

    .token-hex {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5pt;
      color: #733635;
      background: #ECECDC/50;
    }

    .timing-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 9pt;
    }

    .timing-table td {
      padding: 10px 0;
      border-bottom: 1px solid #ECECDC;
      vertical-align: top;
      line-height: 1.5;
    }

    .timing-table tr:last-child td {
      border-bottom: none;
    }

    .timing-label {
      width: 110px;
      font-weight: 600;
      color: #351E1C;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="sheet">
    <div class="sheet-content">
      <div class="doc-header">
        <h1 class="main-title">Illustration Design System</h1>
        <div class="main-subtitle">Keizersgracht Media | Version 3.1</div>
      </div>

      <div class="section-heading">
        <span class="sec-num">00</span>
        <span class="sec-title">GUIDING PRINCIPLE</span>
      </div>
      <p>
        These guidelines are a compass, not a rulebook. Every illustration should tell a clear story that lets a website visitor understand a project's real-world impact in about three seconds. Change the layout, the number of nodes, or the structure (including the 3-act format) whenever a project needs it. Start every new illustration from its own brief and treat everything below as reference, not as the answer.
      </p>

      <div class="section-heading">
        <span class="sec-num">01</span>
        <span class="sec-title">FINDING THE RIGHT LEVEL OF ABSTRACTION</span>
      </div>
      <ul class="bullet-list">
        <li><strong>Too literal.</strong> Don't put dense paragraphs or full app screenshots inside cards. It overwhelms the eye and makes the section hard to glance at.</li>
        <li><strong>Too vague.</strong> Don't rely on unlabeled skeleton lines or made-up technical jargon and metrics. Visitors shouldn't have to guess what the software does.</li>
        <li><strong>The sweet spot.</strong> Combine simple visual elements (stepped graphs, progress blocks, checklists) with one short, real-world sentence or question. If the text is generated, cut it off with "..." before it gets into detail.</li>
      </ul>

      <div class="sub-heading">Core rules</div>
      <ul class="bullet-list">
        <li><strong>Floating canvas.</strong> Illustrations sit on a transparent container with no outer box, so cards and connectors float directly on the page background.</li>
        <li><strong>No cartoon people.</strong> Show human actors (field teams, operations staff, institutions) through the tools they use or the screens they look at.</li>
        <li><strong>Center-heavy silhouette.</strong> Outer cards stay compact and the middle card is slightly larger, which gives the layout a gentle rhythm.</li>
        <li><strong>Canvas and sizing.</strong> Desktop uses a standard 960×480 frame (centerline y = 240) that unwraps into a vertical stack on mobile. Always size cards with enough breathing room so text and elements never press against borders.</li>
      </ul>

      <div class="section-heading">
        <span class="sec-num">02</span>
        <span class="sec-title">TWO EXAMPLES FOR REFERENCE</span>
      </div>
      <p>
        These are examples, not templates, and not the end product you should aim for. For every new illustration, read the brief first: what does the project do, who is looking, and what should they understand? Then choose the structure that tells that story best. That could be one of these, a mix, or something quite different (more cards, fewer, another flow). Placeholder content is used below.
      </p>
    </div>

    <div class="page-footer">
      <span>KEIZERSGRACHT MEDIA | Illustration Design System v3.1</span>
      <span>Page 1</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="sheet">
    <div class="sheet-content">
      <div class="sub-heading" style="font-size: 11pt; margin-top: 0;">Example A: Linear pipeline</div>
      <div class="sub-caption">Fits workflows where something comes in, gets processed, and produces a result (intake, routing, automated drafting).</div>

      <!-- Diagram A -->
      <div class="diagram-box">
        <svg width="440" height="110" viewBox="0 0 440 110" fill="none">
          <!-- Card 1 -->
          <g transform="translate(20, 16)">
            <rect width="84" height="78" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="10" y="18" fill="#733635" font-family="Poppins" font-size="6.5" font-weight="600" letter-spacing="0.05em">INPUT</text>
            <rect x="10" y="26" width="14" height="14" rx="1.5" fill="#ECECDC" />
            <rect x="10" y="47" width="64" height="3" rx="1" fill="#351E1C" />
            <rect x="10" y="54" width="46" height="3" rx="1" fill="#ECECDC" />
            <text x="42" y="88" fill="#733635" font-family="Poppins" font-size="6" text-anchor="middle">~145px</text>
          </g>

          <!-- Connector 1 -->
          <line x1="104" y1="55" x2="166" y2="55" stroke="#733635" stroke-width="1.5" stroke-dasharray="3 3" />
          <circle cx="104" cy="55" r="2.5" fill="#733635" />
          <rect x="163" y="52.5" width="5" height="5" rx="1" fill="#351E1C" />
          <circle cx="135" cy="55" r="3" fill="#A0C9CB" />

          <!-- Card 2 -->
          <g transform="translate(166, 8)">
            <rect width="112" height="94" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="10" y="16" fill="#733635" font-family="Poppins" font-size="6.5" font-weight="600" letter-spacing="0.05em">PROCESSOR</text>
            <!-- Row 1 -->
            <rect x="10" y="24" width="7" height="7" rx="1" fill="#351E1C" />
            <rect x="22" y="26" width="54" height="3" rx="1" fill="#351E1C" />
            <rect x="80" y="24" width="22" height="7" rx="1" fill="#ECECDC" />
            <!-- Row 2 -->
            <rect x="10" y="37" width="7" height="7" rx="1" fill="#A0C9CB" />
            <rect x="22" y="39" width="48" height="3" rx="1" fill="#A0C9CB" />
            <!-- Row 3 -->
            <rect x="10" y="50" width="7" height="7" rx="1" fill="#ECECDC" />
            <rect x="22" y="52" width="62" height="3" rx="1" fill="#ECECDC" />
            <!-- Row 4 -->
            <rect x="10" y="63" width="7" height="7" rx="1" fill="#ECECDC" />
            <rect x="22" y="65" width="52" height="3" rx="1" fill="#ECECDC" />
            <text x="56" y="104" fill="#733635" font-family="Poppins" font-size="6" text-anchor="middle">~200px</text>
          </g>

          <!-- Connector 2 -->
          <line x1="278" y1="55" x2="336" y2="55" stroke="#733635" stroke-width="1.5" stroke-dasharray="3 3" />
          <circle cx="278" cy="55" r="2.5" fill="#733635" />
          <rect x="333" y="52.5" width="5" height="5" rx="1" fill="#351E1C" />
          <circle cx="307" cy="55" r="3" fill="#351E1C" />

          <!-- Card 3 -->
          <g transform="translate(336, 16)">
            <rect width="90" height="78" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="10" y="18" fill="#733635" font-family="Poppins" font-size="6.5" font-weight="600" letter-spacing="0.05em">OUTPUT</text>
            <rect x="10" y="27" width="70" height="24" rx="1.5" fill="#ECECDC" fill-opacity="0.4" />
            <rect x="14" y="33" width="58" height="2.5" rx="1" fill="#351E1C" />
            <rect x="14" y="39" width="44" height="2.5" rx="1" fill="#A0C9CB" />
            <rect x="14" y="45" width="30" height="2.5" rx="1" fill="#ECECDC" />
            <!-- Action Button -->
            <rect x="42" y="57" width="38" height="12" rx="1.5" fill="#FF6037" />
            <text x="61" y="65" fill="#F5F4ED" font-family="Poppins" font-size="5.5" font-weight="600" text-anchor="middle">ACTION</text>
            <text x="45" y="88" fill="#733635" font-family="Poppins" font-size="6" text-anchor="middle">~195px</text>
          </g>
        </svg>
      </div>

      <ul class="bullet-list" style="margin-bottom: 22px;">
        <li><strong>Card 1, Input (~145px):</strong> cycles through three states of the same kind of input, each showing a short example such as "Example question?" Keep transitions fresh—whether using a crisp vertical flip, slide, or fade.</li>
        <li><strong>Card 2, Processor (~200px):</strong> a 4-row checklist with 10x10px checkboxes (2px radius). Row 1 stays checked in every state. Rows 2 to 4 switch on and off in sync with Card 1.</li>
        <li><strong>Card 3, Output (~195px):</strong> types out a one-sentence reply that matches the input, cuts off with "..." (for example "Thanks for getting in touch, here is what we can do..."), then pulses the coral action button.</li>
        <li><strong>Connectors:</strong> Keep the signal transfer clearly visible to the spectator (a well-defined traveling pulse or terminal ping) so people can easily track cause and effect without straining to see it.</li>
      </ul>

      <div class="sub-heading" style="font-size: 11pt; margin-top: 14px;">Example B: Hub-and-spoke map</div>
      <div class="sub-caption">Fits field data collection, geographic networks, and reporting to several stakeholders.</div>

      <!-- Diagram B -->
      <div class="diagram-box">
        <svg width="440" height="110" viewBox="0 0 440 110" fill="none">
          <!-- Act 1: Entry -->
          <g transform="translate(16, 22)">
            <rect width="66" height="66" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="8" y="16" fill="#733635" font-family="Poppins" font-size="6" font-weight="600">ENTRY</text>
            <rect x="8" y="24" width="50" height="2" rx="1" fill="#351E1C" />
            <rect x="8" y="30" width="38" height="2" rx="1" fill="#ECECDC" />
            <rect x="8" y="36" width="28" height="2" rx="1" fill="#ECECDC" />
          </g>

          <!-- Line Entry -> Hub -->
          <line x1="82" y1="55" x2="160" y2="55" stroke="#733635" stroke-width="1.5" stroke-dasharray="3 3" />

          <!-- Center Map Hub -->
          <g transform="translate(160, 5)">
            <circle cx="50" cy="50" r="48" fill="#ECECDC" fill-opacity="0.3" stroke="#ECECDC" stroke-width="1" />
            <!-- Streets -->
            <line x1="15" y1="50" x2="85" y2="50" stroke="#351E1C" stroke-width="1" stroke-opacity="0.5" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#351E1C" stroke-width="1" stroke-opacity="0.5" />
            <path d="M20 70 Q 50 35 80 40" stroke="#A0C9CB" stroke-width="2" fill="none" />
            <!-- Nodes -->
            <rect x="32" y="34" width="7" height="7" rx="1.5" fill="#FF6037" />
            <rect x="58" y="28" width="7" height="7" rx="1.5" fill="#FF6037" />
            <rect x="38" y="60" width="7" height="7" rx="1.5" fill="#ECECDC" stroke="#733635" stroke-width="1" />
            <rect x="64" y="58" width="7" height="7" rx="1.5" fill="#ECECDC" stroke="#733635" stroke-width="1" />
            <!-- Popup -->
            <g transform="translate(48, -2)">
              <rect width="36" height="16" rx="2" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1" />
              <text x="18" y="8" fill="#733635" font-family="Poppins" font-size="4.5" text-anchor="middle">POPUP</text>
              <rect x="6" y="11" width="6" height="2" rx="0.5" fill="#A0C9CB" />
              <rect x="15" y="11" width="8" height="2" rx="0.5" fill="#351E1C" />
            </g>
            <text x="50" y="103" fill="#733635" font-family="Poppins" font-size="5" text-anchor="middle">~360px radial mask</text>
          </g>

          <!-- Lines Hub -> Spectators -->
          <line x1="260" y1="42" x2="310" y2="30" stroke="#733635" stroke-width="1.5" stroke-dasharray="3 3" />
          <line x1="260" y1="68" x2="310" y2="80" stroke="#733635" stroke-width="1.5" stroke-dasharray="3 3" />

          <!-- Spectator 1 -->
          <g transform="translate(310, 10)">
            <rect width="114" height="38" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="8" y="12" fill="#733635" font-family="Poppins" font-size="5.5" font-weight="600">SPECTATOR 1</text>
            <!-- 8 Squares -->
            <g transform="translate(8, 18)">
              <rect x="0" y="0" width="8" height="8" rx="1" fill="#FF6037" />
              <rect x="11" y="0" width="8" height="8" rx="1" fill="#FF6037" />
              <rect x="22" y="0" width="8" height="8" rx="1" fill="#FF6037" />
              <rect x="33" y="0" width="8" height="8" rx="1" fill="#FF6037" />
              <rect x="44" y="0" width="8" height="8" rx="1" fill="#ECECDC" />
              <rect x="55" y="0" width="8" height="8" rx="1" fill="#ECECDC" />
              <rect x="66" y="0" width="8" height="8" rx="1" fill="#ECECDC" />
              <rect x="77" y="0" width="8" height="8" rx="1" fill="#ECECDC" />
            </g>
          </g>

          <!-- Spectator 2 -->
          <g transform="translate(310, 58)">
            <rect width="114" height="44" rx="3" fill="#F5F4ED" stroke="#ECECDC" stroke-width="1.5" />
            <text x="8" y="12" fill="#733635" font-family="Poppins" font-size="5.5" font-weight="600">SPECTATOR 2</text>
            <!-- 3 Bars -->
            <g transform="translate(20, 18)">
              <rect x="0" y="6" width="10" height="14" rx="1" fill="#A0C9CB" />
              <rect x="18" y="2" width="10" height="18" rx="1" fill="#351E1C" />
              <rect x="36" y="10" width="10" height="10" rx="1" fill="#733635" />
            </g>
          </g>
        </svg>
      </div>

      <ul class="bullet-list">
        <li><strong>Act 1, Entry card (~140px):</strong> a small card with a simple icon and a 3-row abstract checklist, connected to the map by a dashed line.</li>
        <li><strong>Act 2, Map hub (~360px circle):</strong> a simplified map (1px Espresso streets, an Aqua water line, building footprints) inside a radial fade mask: <code style="font-family: 'JetBrains Mono'; font-size: 8pt; color: #733635;">radial-gradient(circle, #000 48%, transparent 72%)</code>. Four clickable squares (2px radius) turn Coral one by one. The active square opens a floating popup with a small stepped sparkline or bar chart, with no numbers.</li>
        <li><strong>Act 3, Two spectator cards:</strong> the top card shows a row of 8 squares that turn Coral as items join, with a one-line caption. The bottom card shows 3 bars (Aqua and Espresso) that change height as the map advances, also with a one-line caption.</li>
      </ul>
    </div>

    <div class="page-footer">
      <span>KEIZERSGRACHT MEDIA | Illustration Design System v3.1</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- ==================== PAGE 3 ==================== -->
  <div class="sheet">
    <div class="sheet-content">
      <div class="section-heading" style="margin-top: 0;">
        <span class="sec-num">03</span>
        <span class="sec-title">COLOR TOKENS AND CORNER RADII</span>
      </div>

      <table class="token-table">
        <thead>
          <tr>
            <th style="width: 130px;">Token</th>
            <th style="width: 100px;">Hex</th>
            <th>Used for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #F5F4ED; border: 1px solid #ECECDC;"></span>
              <span class="token-name">Canvas</span>
            </td>
            <td><span class="token-hex">#F5F4ED</span></td>
            <td>Page background, card fill, floating popups</td>
          </tr>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #ECECDC;"></span>
              <span class="token-name">Sand</span>
            </td>
            <td><span class="token-hex">#ECECDC</span></td>
            <td>Card borders (1.5px), unvisited map nodes, empty chart tracks, subtle bubbles</td>
          </tr>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #351E1C;"></span>
              <span class="token-name">Espresso</span>
            </td>
            <td><span class="token-hex">#351E1C</span></td>
            <td>Titles (Sintony Bold, 13 to 14px), icons, active checkboxes, main chart bars, map grid (1px)</td>
          </tr>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #733635;"></span>
              <span class="token-name">Terracotta</span>
            </td>
            <td><span class="token-hex">#733635</span></td>
            <td>Captions and micro-labels (Poppins, 11px), dashed connectors (1.5px, dash 3 3)</td>
          </tr>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #A0C9CB;"></span>
              <span class="token-name">Aqua</span>
            </td>
            <td><span class="token-hex">#A0C9CB</span></td>
            <td>Water vectors, stepped sparklines, secondary bars, active checklist highlights</td>
          </tr>
          <tr>
            <td>
              <span class="swatch-chip" style="background: #FF6037;"></span>
              <span class="token-name">Coral</span>
            </td>
            <td><span class="token-hex">#FF6037</span></td>
            <td>Primary action buttons, active map pins, cumulative participation blocks</td>
          </tr>
        </tbody>
      </table>

      <div class="sub-heading" style="font-size: 11pt; margin-top: 26px;">Corner radii</div>
      <ul class="bullet-list">
        <li><strong>Cards:</strong> 3px radius, with a warm shadow: <code style="font-family: 'JetBrains Mono'; font-size: 8pt; color: #733635;">0 10px 24px rgba(115, 54, 53, 0.08)</code></li>
        <li><strong>Checkboxes, buttons, map nodes, grid blocks:</strong> 2px radius.</li>
        <li><strong>Skeleton and chart bars:</strong> 1px radius.</li>
        <li><strong>Never use fully rounded pill shapes.</strong></li>
      </ul>
    </div>

    <div class="page-footer">
      <span>KEIZERSGRACHT MEDIA | Illustration Design System v3.1</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- ==================== PAGE 4 ==================== -->
  <div class="sheet">
    <div class="sheet-content">
      <div class="section-heading" style="margin-top: 0;">
        <span class="sec-num">04</span>
        <span class="sec-title">ANIMATION AND TIMING</span>
      </div>
      <p>
        Animation is there to help the spectator follow the story. The timings further down come from the two examples and are only a starting point. For each new illustration, the question is whether a visitor can actually keep up.
      </p>

      <div class="sub-heading">What to check</div>
      <ul class="bullet-list">
        <li><strong>Can they follow the process?</strong> It should be clear what happens first, what it triggers, and where it ends up.</li>
        <li><strong>Is there time to take it in?</strong> After something changes, give people a moment to look at each element before the next animation starts. More elements, text, or charts on screen means a longer pause.</li>
        <li><strong>Does it guide the eye?</strong> Sequence the steps in reading or cause-and-effect order instead of changing everything at once, so attention moves in one direction.</li>
        <li><strong>Is there a rest before it loops?</strong> Hold the finished state briefly before a new cycle begins, so the result can be read.</li>
        <li><strong>Does it hold up cold?</strong> Watch it as a first-time visitor. If you lose track of what is happening, slow it down or simplify it.</li>
        <li><strong>Does it handle clicks cleanly?</strong> Clicking any card or node should immediately jump to that state and smoothly restart the cycle. Avoid hover-pause locks that freeze the animation.</li>
      </ul>

      <div class="sub-heading">Cycle length</div>
      <p>
        Set the length of a cycle per illustration, based on how much the spectator has to read and how many elements change. A single short line needs less time than a map with a popup and two charts. Both can be a repeating cycle, as long as the points above are met.
      </p>

      <div class="sub-heading">Timings used in the examples</div>
      <div class="sub-caption">Use as a reference for pacing, not as a rule.</div>

      <table class="timing-table">
        <tbody>
          <tr>
            <td class="timing-label">Example A</td>
            <td>
              About 7.5s per cycle: card 1 changes at 0.0s, connector pulse at 0.9s, card 2 updates at 1.5s, second connector pulse at 2.4s, card 3 types its reply from 3.0s to 6.0s, then the action button pulses.
            </td>
          </tr>
          <tr>
            <td class="timing-label">Example B</td>
            <td>
              One step every 6000ms, with already visited items staying marked so progress builds up.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-footer">
      <span>KEIZERSGRACHT MEDIA | Illustration Design System v3.1</span>
      <span>Page 4</span>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(__dirname, 'style-guide-illustrations.html');
const pdfPath = path.join(__dirname, 'Keizersgracht-Illustration-Design-Guidelines.pdf');
const downloadPath1 = path.join('C:\\Users\\dcvan\\Downloads', 'Keizersgracht_Illustration_Design_System_v3.1_clean.pdf');
const downloadPath2 = path.join('C:\\Users\\dcvan\\Downloads', 'Keizersgracht Illustration Design System v3.1.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML written to:', htmlPath);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;

try {
  console.log('Running Chrome to generate PDF...');
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(pdfPath);
  console.log('PDF successfully generated:', pdfPath, 'Size:', stats.size, 'bytes');

  // Also copy to Downloads so user has it immediately in their Downloads folder
  fs.copyFileSync(pdfPath, downloadPath1);
  fs.copyFileSync(pdfPath, downloadPath2);
  console.log('Copied to:', downloadPath1);
  console.log('Copied to:', downloadPath2);
} catch (e) {
  console.error('Error generating PDF:', e);
}
