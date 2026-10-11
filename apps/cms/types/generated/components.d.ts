import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHeading extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headings';
  info: {
    displayName: 'Intertitre';
    icon: 'heading';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksNote extends Struct.ComponentSchema {
  collectionName: 'components_blocks_notes';
  info: {
    displayName: 'Encadr\u00E9';
    icon: 'information';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksParagraph extends Struct.ComponentSchema {
  collectionName: 'components_blocks_paragraphs';
  info: {
    displayName: 'Paragraphe';
    icon: 'align-left';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksQuote extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quotes';
  info: {
    displayName: 'Citation';
    icon: 'quote';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksVerse extends Struct.ComponentSchema {
  collectionName: 'components_blocks_verses';
  info: {
    displayName: 'Verset';
    icon: 'book';
  };
  attributes: {
    arabic: Schema.Attribute.String & Schema.Attribute.Required;
    reference: Schema.Attribute.String & Schema.Attribute.Required;
    translation: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksYoutube extends Struct.ComponentSchema {
  collectionName: 'components_blocks_youtubes';
  info: {
    displayName: 'Vid\u00E9o YouTube';
    icon: 'play';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeBlogPreview extends Struct.ComponentSchema {
  collectionName: 'components_home_blog_previews';
  info: {
    displayName: 'Accueil \u2014 Blog';
    icon: 'cube';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
  };
}

export interface HomeDiagnosticTeaser extends Struct.ComponentSchema {
  collectionName: 'components_home_diagnostic_teasers';
  info: {
    displayName: 'Accueil \u2014 Teaser diagnostic';
    icon: 'cube';
  };
  attributes: {
    checks: Schema.Attribute.Component<'shared.text-line', true>;
    cta: Schema.Attribute.Component<'shared.button', false>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
    moreLabel: Schema.Attribute.String & Schema.Attribute.Required;
    openLabel: Schema.Attribute.String & Schema.Attribute.Required;
    previewTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeFaqPreview extends Struct.ComponentSchema {
  collectionName: 'components_home_faq_previews';
  info: {
    displayName: 'Accueil \u2014 FAQ';
    icon: 'cube';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<4>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heros';
  info: {
    displayName: 'Accueil \u2014 Hero';
    icon: 'cube';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.Required;
    chips: Schema.Attribute.Component<'shared.text-line', true>;
    forLabel: Schema.Attribute.String & Schema.Attribute.Required;
    guarantees: Schema.Attribute.Component<'shared.text-line', true>;
    lead: Schema.Attribute.Text & Schema.Attribute.Required;
    primary: Schema.Attribute.Component<'shared.button', false>;
    secondary: Schema.Attribute.Component<'shared.button', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAccent: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_home_how_it_workss';
  info: {
    displayName: 'Accueil \u2014 Comment \u00E7a marche';
    icon: 'cube';
  };
  attributes: {
    header: Schema.Attribute.Component<'shared.section-header', false>;
    steps: Schema.Attribute.Component<'shared.step', true>;
  };
}

export interface HomeLatestVideos extends Struct.ComponentSchema {
  collectionName: 'components_home_latest_videoss';
  info: {
    displayName: 'Accueil \u2014 Vid\u00E9os';
    icon: 'cube';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
  };
}

export interface HomePodcast extends Struct.ComponentSchema {
  collectionName: 'components_home_podcasts';
  info: {
    displayName: 'Accueil \u2014 Podcast';
    icon: 'cube';
  };
  attributes: {
    button: Schema.Attribute.String & Schema.Attribute.Required;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    lead: Schema.Attribute.Text & Schema.Attribute.Required;
    note: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAccent: Schema.Attribute.String & Schema.Attribute.Required;
    titleAfter: Schema.Attribute.String;
  };
}

export interface HomeTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_home_testimonialss';
  info: {
    displayName: 'Accueil \u2014 T\u00E9moignages';
    icon: 'cube';
  };
  attributes: {
    header: Schema.Attribute.Component<'shared.section-header', false>;
    note: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeThemesStrip extends Struct.ComponentSchema {
  collectionName: 'components_home_themes_strips';
  info: {
    displayName: 'Accueil \u2014 Th\u00E8mes';
    icon: 'cube';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.text-line', true>;
  };
}

export interface HomeVerse extends Struct.ComponentSchema {
  collectionName: 'components_home_verses';
  info: {
    displayName: 'Accueil \u2014 Verset';
    icon: 'cube';
  };
  attributes: {
    arabic: Schema.Attribute.String & Schema.Attribute.Required;
    reference: Schema.Attribute.String & Schema.Attribute.Required;
    translation: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeWhyUs extends Struct.ComponentSchema {
  collectionName: 'components_home_why_uss';
  info: {
    displayName: 'Accueil \u2014 Pourquoi';
    icon: 'cube';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature', true>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
  };
}

export interface SectionsTextHighlight extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_highlights';
  info: {
    displayName: 'Section \u2014 Texte mis en avant';
    icon: 'quote';
  };
  attributes: {
    ctaHref: Schema.Attribute.String & Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String;
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAccent: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Bouton';
    icon: 'cube';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'gold', 'outline', 'white', 'outline-light']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'Atout';
    icon: 'cube';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['shield', 'book', 'heart']> &
      Schema.Attribute.DefaultTo<'shield'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Lien';
    icon: 'cube';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    displayName: 'En-t\u00EAte de section';
    icon: 'cube';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    lead: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAccent: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'cube';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Chiffre';
    icon: 'cube';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: '\u00C9tape';
    icon: 'cube';
  };
  attributes: {
    linkLabel: Schema.Attribute.String;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedTextLine extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_lines';
  info: {
    displayName: 'Ligne de texte';
    icon: 'cube';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_values';
  info: {
    displayName: 'Valeur';
    icon: 'cube';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.heading': BlocksHeading;
      'blocks.note': BlocksNote;
      'blocks.paragraph': BlocksParagraph;
      'blocks.quote': BlocksQuote;
      'blocks.verse': BlocksVerse;
      'blocks.youtube': BlocksYoutube;
      'home.blog-preview': HomeBlogPreview;
      'home.diagnostic-teaser': HomeDiagnosticTeaser;
      'home.faq-preview': HomeFaqPreview;
      'home.hero': HomeHero;
      'home.how-it-works': HomeHowItWorks;
      'home.latest-videos': HomeLatestVideos;
      'home.podcast': HomePodcast;
      'home.testimonials': HomeTestimonials;
      'home.themes-strip': HomeThemesStrip;
      'home.verse': HomeVerse;
      'home.why-us': HomeWhyUs;
      'sections.text-highlight': SectionsTextHighlight;
      'shared.button': SharedButton;
      'shared.feature': SharedFeature;
      'shared.link': SharedLink;
      'shared.section-header': SharedSectionHeader;
      'shared.seo': SharedSeo;
      'shared.stat': SharedStat;
      'shared.step': SharedStep;
      'shared.text-line': SharedTextLine;
      'shared.value': SharedValue;
    }
  }
}
