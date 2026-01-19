export interface StsToken {
  data: {
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
    expiration: string;
    region: string;
  };
}
