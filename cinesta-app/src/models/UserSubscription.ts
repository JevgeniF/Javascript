interface AppUser {
  appUserId: string;
  name: string;
  surname: string
}

interface LangString {
  en: string;
  ee: string;
  ru: string;
}

interface Subscription {
  subscriptionId: string;
  naming: LangString;
  description: LangString;
  profilesCount: number;
  price: number;
}

export interface UserSubscription {
    id: string;
    appUser: AppUser;
    subscription: Subscription;
    expirationDateTime: string;
}
