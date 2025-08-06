// Removed thirdparties dependency
import { Article } from "@mkboard/widget";
import privacyPolicyHtml from "./privacy-policy.html.ts";
import * as styles from "./static.module.less";
import termsOfServiceHtml from "./terms-of-service.html.ts";

export function PrivacyPolicyPage() {
  return (
    <Article className={styles.numbered}>
      <div
        dangerouslySetInnerHTML={{
          __html: privacyPolicyHtml,
        }}
      />
      {/* Cookie Declaration removed with third-party dependencies */}
    </Article>
  );
}

export function TermsOfServicePage() {
  return (
    <Article className={styles.numbered}>
      <div
        dangerouslySetInnerHTML={{
          __html: termsOfServiceHtml,
        }}
      />
    </Article>
  );
}
