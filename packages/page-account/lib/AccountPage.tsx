import { Article, Header, Para } from "@mkboard/widget";
import { FormattedMessage } from "react-intl";

export function AccountPage() {
  return (
    <Article>
      <Header level={1}>
        <FormattedMessage
          id="account.noLoginPage.title"
          defaultMessage="No Account Required"
        />
      </Header>
      
      <Para>
        <FormattedMessage
          id="account.noLoginPage.description"
          defaultMessage="This typing practice application works without any account or login. Your typing data is stored locally in your browser and you can start practicing immediately. All features are available without registration."
        />
      </Para>
      
      <Para>
        <FormattedMessage
          id="account.noLoginPage.localData"
          defaultMessage="Your progress, statistics, and settings are automatically saved in your browser's local storage. This means your data stays private and is only accessible from this device and browser."
        />
      </Para>
      
      <Para>
        <FormattedMessage
          id="account.noLoginPage.getStarted"
          defaultMessage="Ready to improve your typing skills? Head over to the practice page and start typing!"
        />
      </Para>
    </Article>
  );
}
