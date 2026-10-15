const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Keizersgracht Media — Visual Identity & System Guidelines</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@300;400;500;600;700&family=Sintony:wght@400;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 420mm 297mm; /* Exact A3 Landscape */
      margin: 0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      width: 420mm;
      height: 297mm;
      overflow: hidden;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FAF9F5;
      color: #351E1C;
      font-size: 8pt;
      line-height: 1.45;
    }

    .poster {
      width: 420mm;
      height: 297mm;
      padding: 13mm 16mm 11mm 16mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background-color: #FAF9F5;
      box-sizing: border-box;
    }

    /* Top Master Header */
    .poster-header {
      border-bottom: 2px solid #351E1C;
      padding-bottom: 10px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand-eyebrow {
      font-family: 'Poppins', sans-serif;
      font-size: 8pt;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #733635;
      font-weight: 600;
      margin-bottom: 3px;
    }

    .main-title {
      font-family: 'Sintony', serif, sans-serif;
      font-size: 24pt;
      font-weight: 700;
      color: #351E1C;
      line-height: 1.05;
      letter-spacing: -0.02em;
    }

    .header-meta {
      display: flex;
      gap: 22px;
      align-items: center;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
      text-align: right;
    }

    .meta-label {
      font-family: 'Poppins', sans-serif;
      font-size: 7pt;
      color: #733635;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 600;
    }

    .meta-value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5pt;
      color: #351E1C;
      font-weight: 500;
    }

    /* 4-Column Grid */
    .grid-container {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      align-items: stretch;
      min-height: 0;
    }

    .col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #F5F4ED;
      border: 1.5px solid #E4E0D6;
      border-radius: 3px;
      padding: 12px 13px 12px 13px;
      box-shadow: 0 4px 14px rgba(115, 54, 53, 0.04);
      overflow: hidden;
    }

    .col-header {
      border-bottom: 1.5px solid #E4E0D6;
      padding-bottom: 7px;
      margin-bottom: 10px;
      display: flex;
      align-items: baseline;
      gap: 7px;
    }

    .col-num {
      font-family: 'Poppins', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      color: #FF6037;
    }

    .col-title {
      font-family: 'Sintony', sans-serif;
      font-size: 11.5pt;
      font-weight: 700;
      color: #351E1C;
      letter-spacing: -0.01em;
    }

    .col-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      justify-content: space-between;
    }

    .section-block {
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }

    .block-title {
      font-size: 7.6pt;
      font-weight: 700;
      color: #733635;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    p {
      color: #351E1C;
      font-size: 7.5pt;
      line-height: 1.42;
    }

    ul.bullet-list {
      list-style: none;
      padding-left: 0;
    }

    ul.bullet-list li {
      position: relative;
      padding-left: 10px;
      margin-bottom: 3.5px;
      font-size: 7.4pt;
      line-height: 1.38;
      color: #351E1C;
    }

    ul.bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #733635;
      font-size: 8.5pt;
      line-height: 1;
      top: 0px;
    }

    ul.bullet-list li strong {
      font-weight: 600;
      color: #351E1C;
    }

    /* Badges & Tags */
    .tag-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin: 2px 0;
    }

    .tag-item {
      display: flex;
      flex-direction: column;
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 2px;
      padding: 3px 6px;
    }

    .tag-item-name {
      font-size: 7.2pt;
      font-weight: 600;
      color: #351E1C;
    }

    .tag-item-desc {
      font-size: 6.2pt;
      color: #733635;
      line-height: 1.2;
    }

    /* Editorial Matrix (Say This / Not That) */
    .voice-matrix {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 2px;
      padding: 6px 8px;
    }

    .voice-pair {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      padding-bottom: 4px;
      border-bottom: 1px solid #E2DDCF;
    }

    .voice-pair:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .voice-avoid {
      font-size: 6.6pt;
      color: #9E4A48;
      text-decoration: line-through;
      line-height: 1.25;
    }

    .voice-use {
      font-size: 6.8pt;
      color: #351E1C;
      font-weight: 600;
      line-height: 1.25;
    }

    /* Anti-Patterns Box */
    .anti-pattern-box {
      background: #FDF9F7;
      border: 1px solid #E9C8C1;
      border-left: 3px solid #733635;
      border-radius: 2px;
      padding: 5px 8px;
    }

    .anti-pattern-box ul li::before {
      color: #733635;
    }

    /* Type Specimens */
    .specimen-box {
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 2px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .specimen-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #E2DDCF;
      padding-bottom: 3px;
    }

    .specimen-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .specimen-label {
      font-size: 6.5pt;
      font-weight: 600;
      color: #733635;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .specimen-chars {
      font-size: 7.5pt;
      color: #351E1C;
    }

    /* Typography Scale Table */
    .type-scale-table {
      display: flex;
      flex-direction: column;
      border: 1px solid #E4E0D6;
      border-radius: 2px;
      overflow: hidden;
      background: #FAF9F5;
    }

    .type-scale-row {
      display: grid;
      grid-template-columns: 68px 1fr;
      gap: 6px;
      align-items: baseline;
      padding: 3.5px 7px;
      border-bottom: 1px solid #ECE8E1;
    }

    .type-scale-row:last-child {
      border-bottom: none;
    }

    .ts-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6.2pt;
      color: #733635;
      line-height: 1.2;
    }

    .ts-sample {
      color: #351E1C;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Color Swatches Grid */
    .color-spec-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .color-card {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #FAF9F5;
      border: 1px solid #E4E0D6;
      border-radius: 2px;
      padding: 4px 7px;
    }

    .color-swatch-chip {
      width: 24px;
      height: 24px;
      border-radius: 2px;
      flex-shrink: 0;
      border: 1px solid rgba(53, 30, 28, 0.12);
    }

    .color-details {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .color-title-line {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .color-name {
      font-size: 7.5pt;
      font-weight: 700;
      color: #351E1C;
    }

    .color-hex {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7pt;
      color: #733635;
      font-weight: 600;
    }

    .color-breakdown {
      font-family: 'JetBrains Mono', monospace;
      font-size: 5.8pt;
      color: #7B716A;
      line-height: 1.25;
    }

    .color-role-text {
      font-size: 6.4pt;
      color: #351E1C;
      line-height: 1.2;
      margin-top: 1px;
    }

    /* Gradients Block */
    .grad-strip {
      height: 19px;
      border-radius: 2px;
      margin-bottom: 3.5px;
      border: 1px solid rgba(53, 30, 28, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 7px;
      font-size: 6.5pt;
      font-weight: 600;
      color: #351E1C;
    }

    .grad-stops {
      font-family: 'JetBrains Mono', monospace;
      font-size: 5.8pt;
      color: #733635;
      font-weight: 400;
    }

    /* Accessibility / Contrast Bar */
    .contrast-box {
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 2px;
      padding: 5px 7px;
      font-size: 6.5pt;
      line-height: 1.35;
      color: #351E1C;
    }

    /* DO / DON'T Geometry Diagram */
    .chamfer-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin: 2px 0;
    }

    .chamfer-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 6px 5px;
      border: 1px solid #DCD7CD;
      background: #ECE8E1;
    }

    .chamfer-card.do-card {
      border-radius: 3px;
      border-color: #A0C9CB;
      background: #F1F7F7;
    }

    .chamfer-card.dont-card {
      border-radius: 18px; /* Obvious pill bubble */
      border-color: #E9C8C1;
      background: #FDF7F6;
    }

    .chamfer-status {
      font-family: 'JetBrains Mono', monospace;
      font-size: 6pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }

    .do-card .chamfer-status {
      color: #3B7274;
    }

    .dont-card .chamfer-status {
      color: #9E4A48;
    }

    .chamfer-caption {
      font-size: 6.2pt;
      color: #351E1C;
      line-height: 1.2;
    }

    /* Spatial Rhythm Bar */
    .rhythm-scale {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 2px;
      padding: 4px 6px;
    }

    .rhythm-unit {
      flex: 1;
      text-align: center;
      background: #FAF9F5;
      border: 1px solid #DCD7CD;
      border-radius: 1px;
      padding: 2px 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 6pt;
      color: #733635;
      font-weight: 600;
    }

    /* Action Anatomy Specimen */
    .anatomy-card {
      background: #ECE8E1;
      border: 1px solid #DCD7CD;
      border-radius: 3px;
      padding: 6px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .anatomy-cta {
      background: #FF6037;
      color: #FAF9F5;
      padding: 4.5px 11px;
      border-radius: 2px;
      font-size: 7.2pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    /* Photography Box */
    .photo-guideline-box {
      background: #FAF9F5;
      border: 1px solid #E4E0D6;
      border-radius: 2px;
      padding: 5px 7px;
    }

    /* Footer */
    .poster-footer {
      border-top: 1.5px solid #351E1C;
      padding-top: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #733635;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>

  <div class="poster">
    <!-- Header -->
    <header class="poster-header">
      <div>
        <div class="brand-eyebrow">Keizersgracht Media • Visual Standards Broadsheet</div>
        <h1 class="main-title">Visual Identity &amp; System Guidelines</h1>
      </div>
      <div class="header-meta">
        <div class="meta-item">
          <span class="meta-label">Format</span>
          <span class="meta-value">A3 Broadsheet (420×297mm)</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Version</span>
          <span class="meta-value">v1.0 (2026)</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Application</span>
          <span class="meta-value">Web · Physical · Brand</span>
        </div>
      </div>
    </header>

    <!-- 4-Column Grid -->
    <main class="grid-container">

      <!-- ==================== COLUMN 1 ==================== -->
      <section class="col">
        <div class="col-header">
          <span class="col-num">01</span>
          <span class="col-title">Brand &amp; Voice</span>
        </div>

        <div class="col-body">
          <div class="section-block">
            <div class="block-title">00 Guiding Principle</div>
            <p>
              A compass, not a rulebook. We build software, AI agents, and data tools around how teams actually operate. Our visual identity reflects that: grounded, unpretentious, and human. Whether designing a client dashboard, marketing website, or print stationery, keep every touchpoint tactile, functional, and devoid of agency fluff.
            </p>
          </div>

          <div class="section-block">
            <div class="block-title">Team Structure &amp; Ethos</div>
            <p style="font-size: 7.3pt; color: #733635; font-weight: 500;">
              <strong>Two senior operators:</strong> Direct client-to-builder collaboration. No account managers, no six-month slide decks, no synthetic buzzwords.
            </p>
          </div>

          <div class="section-block">
            <div class="block-title">Core Personality Attributes</div>
            <div class="tag-grid">
              <div class="tag-item">
                <span class="tag-item-name">Grounded</span>
                <span class="tag-item-desc">Rooted in operational reality</span>
              </div>
              <div class="tag-item">
                <span class="tag-item-name">Practical</span>
                <span class="tag-item-desc">Utility over speculative hype</span>
              </div>
              <div class="tag-item">
                <span class="tag-item-name">Collaborative</span>
                <span class="tag-item-desc">Working directly alongside teams</span>
              </div>
              <div class="tag-item">
                <span class="tag-item-name">Helpful</span>
                <span class="tag-item-desc">Reducing cognitive burden</span>
              </div>
              <div class="tag-item">
                <span class="tag-item-name">Approachable</span>
                <span class="tag-item-desc">Warm, plainspoken, Dutch craft</span>
              </div>
              <div class="tag-item">
                <span class="tag-item-name">Small on Purpose</span>
                <span class="tag-item-desc">Agile, personal, high focus</span>
              </div>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Voice &amp; Tone Rules</div>
            <ul class="bullet-list">
              <li><strong>Speak like a person:</strong> Be direct, warm, and conversational. Write like you speak over coffee.</li>
              <li><strong>Active verbs:</strong> Lead with what software does (<em>"Turning incoming messages into ready-to-send replies"</em>).</li>
              <li><strong>No synthetic metrics:</strong> Ban fake percentage badges and vanity stats. Real utility requires no hype.</li>
              <li><strong>Human-in-the-loop:</strong> When presenting automation, always showcase the human verification and sign-off step.</li>
            </ul>
          </div>

          <div class="section-block">
            <div class="block-title">Editorial Voice Matrix</div>
            <div class="voice-matrix">
              <div class="voice-pair">
                <div class="voice-avoid">"Enterprise-grade cognitive AI synergy platform"</div>
                <div class="voice-use">"Software that organizes incoming orders and drafts replies."</div>
              </div>
              <div class="voice-pair">
                <div class="voice-avoid">"Revolutionizing human capital via neural pipelines"</div>
                <div class="voice-use">"Tools built around the way your team actually works."</div>
              </div>
              <div class="voice-pair">
                <div class="voice-avoid">"Autonomous seamless omnichannel orchestration"</div>
                <div class="voice-use">"Direct integrations that stop manual copy-pasting."</div>
              </div>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Visual Anti-Patterns</div>
            <div class="anti-pattern-box">
              <ul class="bullet-list" style="margin-bottom: 0;">
                <li><strong>No generic AI tropes:</strong> Never use neon glowing orbs, floating 3D plastic cubes, or purple/indigo gradients.</li>
                <li><strong>No cartoon people:</strong> Show human teams through their tools, data views, or documentary photography.</li>
                <li><strong>No bloated bentos:</strong> Avoid decorative card mosaics packed with meaningless icon filler.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== COLUMN 2 ==================== -->
      <section class="col">
        <div class="col-header">
          <span class="col-num">02</span>
          <span class="col-title">Typography &amp; Scale</span>
        </div>

        <div class="col-body">
          <div class="section-block">
            <div class="block-title">Primary Font Families</div>
            <ul class="bullet-list">
              <li><strong>Display — Sintony Bold:</strong> Architectural geometric sans with Dutch humanist weight. Used for hero statements, H1/H2 titles, and focal numbers.</li>
              <li><strong>Body &amp; UI — Poppins:</strong> Open, legible geometric sans across screen DPIs and offset print. Regular 400 for text, Medium 500 for subtitles, SemiBold 600 for UI.</li>
              <li><strong>Technical — JetBrains Mono:</strong> Crisp monospace for data tokens, status flags, code, and micro-labels.</li>
            </ul>
          </div>

          <div class="section-block">
            <div class="block-title">Font Specimen Previews</div>
            <div class="specimen-box">
              <div class="specimen-row">
                <span class="specimen-label">Sintony 700</span>
                <span class="specimen-chars" style="font-family: 'Sintony'; font-weight: 700;">Aa Bb Cc Gg Rr 0 1 2 3 4 5</span>
              </div>
              <div class="specimen-row">
                <span class="specimen-label">Poppins 500</span>
                <span class="specimen-chars" style="font-family: 'Poppins'; font-weight: 500;">Aa Bb Cc Gg Rr &amp; % / + =</span>
              </div>
              <div class="specimen-row">
                <span class="specimen-label">JB Mono 500</span>
                <span class="specimen-chars" style="font-family: 'JetBrains Mono'; font-weight: 500; font-size: 6.8pt; color: #733635;">0x2F [READY] 14:02 #FF6037</span>
              </div>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Typescale &amp; Hierarchy</div>
            <div class="type-scale-table">
              <div class="type-scale-row">
                <div class="ts-meta">HERO<br>80px / 1.08</div>
                <div class="ts-sample" style="font-family: 'Sintony'; font-weight: 700; font-size: 13.5pt;">Light work.</div>
              </div>
              <div class="type-scale-row">
                <div class="ts-meta">H1 TITLE<br>38px / 1.12</div>
                <div class="ts-sample" style="font-family: 'Sintony'; font-weight: 700; font-size: 10pt;">Turning incoming messages.</div>
              </div>
              <div class="type-scale-row">
                <div class="ts-meta">H2 SUBTITLE<br>20px / 1.45</div>
                <div class="ts-sample" style="font-family: 'Poppins'; font-weight: 500; font-size: 8.5pt; color: #733635;">Software built around your team.</div>
              </div>
              <div class="type-scale-row">
                <div class="ts-meta">BODY<br>14px / 1.70</div>
                <div class="ts-sample" style="font-family: 'Poppins'; font-weight: 400; font-size: 7.8pt;">AI and software that fit how you operate.</div>
              </div>
              <div class="type-scale-row">
                <div class="ts-meta">EYEBROW<br>11px / +0.14em</div>
                <div class="ts-sample" style="font-family: 'Poppins'; font-weight: 600; font-size: 6.8pt; color: #733635; text-transform: uppercase; letter-spacing: 0.14em;">01 — WORKFLOW AUTOMATION</div>
              </div>
              <div class="type-scale-row">
                <div class="ts-meta">CODE / META<br>10.5px / Mono</div>
                <div class="ts-sample" style="font-family: 'JetBrains Mono'; font-weight: 500; font-size: 6.6pt; color: #351E1C;">LATENCY: 14ms · RUN_ID: #885b1d81</div>
              </div>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Universal Typesetting Rules</div>
            <ul class="bullet-list">
              <li><strong>Sentence case standard:</strong> Use natural sentence case for all headlines, subheads, and buttons. Reject aggressive Title Casing.</li>
              <li><strong>Tracked caps exception:</strong> Uppercase is permitted ONLY for eyebrows and micro-tags; always track with <code style="font-family: 'JetBrains Mono'; font-size: 6.5pt; color: #733635;">+0.12em</code> to <code style="font-family: 'JetBrains Mono'; font-size: 6.5pt; color: #733635;">+0.18em</code>.</li>
              <li><strong>Tabular numbers:</strong> In UI dashboards, tables, and metric counters, enable <code style="font-family: 'JetBrains Mono'; font-size: 6.5pt; color: #733635;">font-variant-numeric: tabular-nums</code>.</li>
              <li><strong>Line measure:</strong> Keep running editorial text between 45 and 70 characters per line to guarantee comfortable reading cadence.</li>
              <li><strong>Container breathing room:</strong> Never crowd text against container edges. Maintain tested vertical padding on all cards.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ==================== COLUMN 3 ==================== -->
      <section class="col">
        <div class="col-header">
          <span class="col-num">03</span>
          <span class="col-title">Color Architecture</span>
        </div>

        <div class="col-body">
          <div class="section-block">
            <div class="block-title">Material Palette Specifications</div>
            <div class="color-spec-grid">
              
              <div class="color-card">
                <div class="color-swatch-chip" style="background: #F5F4ED;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Canvas</span>
                    <span class="color-hex">#F5F4ED</span>
                  </div>
                  <div class="color-breakdown">RGB: 245, 244, 237 · CMYK: 2, 2, 6, 0</div>
                  <div class="color-role-text">Primary substrate, paper stock, card background wash</div>
                </div>
              </div>

              <div class="color-card">
                <div class="color-swatch-chip" style="background: #ECE8E1;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Sand (Alabaster)</span>
                    <span class="color-hex">#ECE8E1</span>
                  </div>
                  <div class="color-breakdown">RGB: 236, 232, 225 · CMYK: 5, 5, 9, 2</div>
                  <div class="color-role-text">Secondary cards, founder surfaces, warm track neutral</div>
                </div>
              </div>

              <div class="color-card">
                <div class="color-swatch-chip" style="background: #351E1C;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Espresso</span>
                    <span class="color-hex">#351E1C</span>
                  </div>
                  <div class="color-breakdown">RGB: 53, 30, 28 · CMYK: 45, 65, 62, 68</div>
                  <div class="color-role-text">Primary ink, titles, main body, high-contrast borders</div>
                </div>
              </div>

              <div class="color-card">
                <div class="color-swatch-chip" style="background: #733635;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Terracotta</span>
                    <span class="color-hex">#733635</span>
                  </div>
                  <div class="color-breakdown">RGB: 115, 54, 53 · CMYK: 30, 75, 65, 35</div>
                  <div class="color-role-text">Eyebrows, subtitles, metadata tags, hairline dividers</div>
                </div>
              </div>

              <div class="color-card">
                <div class="color-swatch-chip" style="background: #FF6037;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Coral</span>
                    <span class="color-hex">#FF6037</span>
                  </div>
                  <div class="color-breakdown">RGB: 255, 96, 55 · CMYK: 0, 75, 80, 0</div>
                  <div class="color-role-text">Focal action CTA, active pins, single focal point per viewport</div>
                </div>
              </div>

              <div class="color-card">
                <div class="color-swatch-chip" style="background: #A0C9CB;"></div>
                <div class="color-details">
                  <div class="color-title-line">
                    <span class="color-name">Aqua</span>
                    <span class="color-hex">#A0C9CB</span>
                  </div>
                  <div class="color-breakdown">RGB: 160, 201, 203 · CMYK: 30, 5, 15, 5</div>
                  <div class="color-role-text">Data vectors, water pathways, secondary tool highlights</div>
                </div>
              </div>

            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Atmospheric Washes (Live Website)</div>
            <p style="font-size: 6.8pt; color: #7B716A; margin-bottom: 2px;">
              Subtle horizontal mineral washes used across live case study sections:
            </p>
            <div class="grad-strip" style="background: linear-gradient(90deg, #F5F4ED 0%, #F9BCA8 55%, #ECE8E1 100%);">
              <span>01 Soft Coral (Workflow &amp; Process)</span>
              <span class="grad-stops">#F5F4ED → #F9BCA8 → #ECE8E1</span>
            </div>
            <div class="grad-strip" style="background: linear-gradient(90deg, #F5F4ED 0%, #C2DAD9 55%, #ECE8E1 100%);">
              <span>02 Mineral Aqua (Clean Water Agency)</span>
              <span class="grad-stops">#F5F4ED → #C2DAD9 → #ECE8E1</span>
            </div>
            <div class="grad-strip" style="background: linear-gradient(90deg, #F5F4ED 0%, #D7C8C3 55%, #ECE8E1 100%);">
              <span>03 Limestone Wash (Pricing Tool)</span>
              <span class="grad-stops">#F5F4ED → #D7C8C3 → #ECE8E1</span>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Contrast &amp; Substrate Hierarchy</div>
            <div class="contrast-box">
              <strong>Contrast verification:</strong> Espresso on Canvas provides <strong>14.2:1 (AAA)</strong>. Terracotta on Canvas provides <strong>7.1:1 (AAA)</strong>. Coral on Espresso achieves <strong>4.8:1 (AA)</strong>.<br>
              <strong>Print paper specification:</strong> For stationery and physical cards, specify 450–600gsm uncoated warm cotton stock (FSC-certified). Avoid synthetic high-gloss lamination.
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== COLUMN 4 ==================== -->
      <section class="col">
        <div class="col-header">
          <span class="col-num">04</span>
          <span class="col-title">System &amp; Collateral</span>
        </div>

        <div class="col-body">
          <div class="section-block">
            <div class="block-title">The Micro-Chamfer Rule</div>
            <p>
              We firmly reject rounded-full pill shapes and generic 20px bubble cards. Keizersgracht relies on an architectural micro-radius:
            </p>
            <div class="chamfer-comparison">
              <div class="chamfer-card do-card">
                <span class="chamfer-status">✔ APPROVED SPEC</span>
                <span class="chamfer-caption"><strong>2px – 3px radius</strong><br>Sharp, tactile, architectural micro-chamfer</span>
              </div>
              <div class="chamfer-card dont-card">
                <span class="chamfer-status">✖ FORBIDDEN</span>
                <span class="chamfer-caption"><strong>16px+ / Pill radius</strong><br>Generic SaaS bubble shape, strictly banned</span>
              </div>
            </div>
            <ul class="bullet-list" style="margin-top: 3px;">
              <li><strong>Cards &amp; dialog sheets:</strong> <code style="font-family: 'JetBrains Mono'; font-size: 6.6pt; color: #733635;">3px</code> radius with subtle warm shadow <code style="font-family: 'JetBrains Mono'; font-size: 6.4pt; color: #733635;">0 10px 24px rgba(115, 54, 53, 0.08)</code>.</li>
              <li><strong>Buttons, inputs, tags:</strong> <code style="font-family: 'JetBrains Mono'; font-size: 6.6pt; color: #733635;">2px</code> radius.</li>
              <li><strong>Micro-rules &amp; bars:</strong> <code style="font-family: 'JetBrains Mono'; font-size: 6.6pt; color: #733635;">1px</code> radius.</li>
            </ul>
          </div>

          <div class="section-block">
            <div class="block-title">Spatial 8-Point Rhythm</div>
            <div class="rhythm-scale">
              <div class="rhythm-unit">8px</div>
              <div class="rhythm-unit">16px</div>
              <div class="rhythm-unit">24px</div>
              <div class="rhythm-unit">32px</div>
              <div class="rhythm-unit">48px</div>
              <div class="rhythm-unit">64px</div>
            </div>
            <p style="font-size: 6.8pt; color: #7B716A; margin-top: 2px;">
              All layout margins, card padding, and flex gaps derive strictly from multiples of 8px.
            </p>
          </div>

          <div class="section-block">
            <div class="block-title">Primary Action Anatomy</div>
            <div class="anatomy-card">
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 7.2pt; font-weight: 700; color: #351E1C;">Interactive Trigger</span>
                <span style="font-family: 'JetBrains Mono'; font-size: 6.2pt; color: #733635;">radius: 2px · #FF6037</span>
              </div>
              <div class="anatomy-cta">
                <span>Grab a coffee</span>
                <span style="font-size: 8pt; line-height: 1;">→</span>
              </div>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Photography &amp; Visual Media</div>
            <div class="photo-guideline-box">
              <p style="font-size: 7.1pt; line-height: 1.35;">
                <strong>Documentary realism:</strong> Real founders, physical team spaces, and operational workflows only. Strict rectangular crops with zero rounded corners and zero vignette fade.
              </p>
              <p style="font-size: 6.8pt; color: #733635; margin-top: 2px;">
                <strong>Warm mineral grade:</strong> Layered with a <strong>3% warm Coral tint</strong> (<code style="font-family: 'JetBrains Mono'; font-size: 6.2pt;">rgba(255, 96, 55, 0.03)</code>) and hairline border (<code style="font-family: 'JetBrains Mono'; font-size: 6.2pt;">rgba(53, 30, 28, 0.08)</code>).
              </p>
            </div>
          </div>

          <div class="section-block">
            <div class="block-title">Universal Collateral Guidelines</div>
            <ul class="bullet-list">
              <li><strong>Material honesty:</strong> Digital interfaces simulate heavyweight matte paper stock. Never use synthetic glassmorphism or high-gloss reflections.</li>
              <li><strong>Cross-media consistency:</strong> Whether rendering a web application, an internal terminal, a business card, or branded packaging, adhere to the 3px micro-chamfer and 8px rhythm.</li>
            </ul>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="poster-footer">
      <span>KEIZERSGRACHT MEDIA • DESIGN STANDARDS &amp; BRAND SYSTEM BROADSHEET</span>
      <span>SPECIFICATION: A3 LANDSCAPE (420mm × 297mm) • STRICT MICRO-CHAMFER (2–3px)</span>
      <span>VERSION 1.0 (2026) • ZERO PILLS • 8px BASE SYSTEM</span>
    </footer>
  </div>

</body>
</html>
`;

const htmlPath = path.join(__dirname, 'brand-system-a3-poster.html');
const pdfPath = path.join(__dirname, 'Keizersgracht-Brand-System-Guidelines-A3.pdf');
const downloadPath = path.join('C:\\Users\\dcvan\\Downloads', 'Keizersgracht_Visual_Identity_and_System_Guidelines_v1.0_A3.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML written to:', htmlPath);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;

try {
  console.log('Running Chrome to generate A3 Landscape PDF...');
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(pdfPath);
  console.log('PDF successfully generated:', pdfPath, 'Size:', stats.size, 'bytes');

  // Copy to Downloads
  fs.copyFileSync(pdfPath, downloadPath);
  console.log('Copied to:', downloadPath);
} catch (e) {
  console.error('Error generating PDF:', e);
}
