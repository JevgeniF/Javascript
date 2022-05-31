import { Subscription } from '@/models/Subscription'

interface AppUser {
  appUserId: string;
  name: string;
  surname: string
}

export interface UserSubscription {
    id: string;
    appUser: AppUser;
    subscription: Subscription;
    expirationDateTime: string;
}
