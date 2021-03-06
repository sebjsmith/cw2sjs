import * as crypto from 'crypto';
import * as superagent from 'superagent';

export class Api {
    private static NNA_BASE_ENDPOINT = 'https://gdcportalgw.its-mo.com/gworchest_160803EC/gdc';
    private static NE_BASE_ENDPOINT = 'https://gdcportalgw.its-mo.com/api_v190426_NE/gdc';
    private static INITIAL_APP_STR = '9s5rfKVuMrT03RtzajWNcA';

    private static getBaseEndpoint(regionCode: string, baseEndpoint?: string) {
        if (baseEndpoint) {
            return baseEndpoint;
        } else {
            return (regionCode === 'NNA' ? Api.NNA_BASE_ENDPOINT : Api.NE_BASE_ENDPOINT);
        }
    }

    public async InitialApp(
        regionCode: string,
        locale: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/InitialApp_v2.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale
            });
    }

    public async UserLoginRequest(
        regionCode: string,
        locale: string,
        userId: string,
        password: string,
        passwordEncryptionKey: string,
        baseEndpoint: string) {

        const encryptedPassword = Api.encryptPassword(password, passwordEncryptionKey);

        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/UserLoginRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'UserId': userId,
                'Password': encryptedPassword
            });
    }

    public async BatteryStatusCheckRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/BatteryStatusCheckRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'UserId': gdcUserId,
                'VIN': vin,
                'tz': timeZone
            });
    }

    public async BatteryStatusCheckResultRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        vin: string,
        timeZone: string,
        resultKey: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/BatteryStatusCheckResultRequest.php', {
            'initial_app_str': Api.INITIAL_APP_STR,
            'RegionCode': regionCode,
            'lg': locale,
            'custom_sessionid': customSessionId,
            'DCMID': dcmId,
            'VIN': vin,
            'tz': timeZone,
            'resultKey': resultKey
        });
    }

    public async BatteryStatusRecordsRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/BatteryStatusRecordsRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'UserId': gdcUserId,
                'VIN': vin,
                'tz': timeZone
            });
    }

    public async RemoteACRecordsRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/RemoteACRecordsRequest.php', {
            'initial_app_str': Api.INITIAL_APP_STR,
            'RegionCode': regionCode,
            'lg': locale,
            'custom_sessionid': customSessionId,
            'DCMID': dcmId,
            'UserId': gdcUserId,
            'VIN': vin,
            'tz': timeZone
        });
    }

    public async ACRemoteRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/ACRemoteRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'UserId': gdcUserId,
                'VIN': vin,
                'tz': timeZone
            });
    }

    public async ACRemoteResult(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        vin: string,
        timeZone: string,
        resultKey: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/ACRemoteResult.php', {
            'initial_app_str': Api.INITIAL_APP_STR,
            'RegionCode': regionCode,
            'lg': locale,
            'custom_sessionid': customSessionId,
            'DCMID': dcmId,
            'VIN': vin,
            'tz': timeZone,
            'resultKey': resultKey
        });
    }

    public async ACRemoteOffRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/ACRemoteOffRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'UserId': gdcUserId,
                'VIN': vin,
                'tz': timeZone
            });
    }

    public async ACRemoteOffResult(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        vin: string,
        timeZone: string,
        resultKey: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/ACRemoteOffResult.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'VIN': vin,
                'tz': timeZone,
                'resultKey': resultKey
            });
    }

    public async BatteryRemoteChargingRequest(
        regionCode: string,
        locale: string,
        customSessionId: string,
        dcmId: string,
        gdcUserId: string,
        vin: string,
        timeZone: string,
        baseEndpoint: string) {
        return await this.postForm(Api.getBaseEndpoint(regionCode, baseEndpoint) + '/BatteryRemoteChargingRequest.php',
            {
                'initial_app_str': Api.INITIAL_APP_STR,
                'RegionCode': regionCode,
                'lg': locale,
                'custom_sessionid': customSessionId,
                'DCMID': dcmId,
                'UserId': gdcUserId,
                'VIN': vin,
                'tz': timeZone
            });
    }

    private async postForm(url: string, form: object) {
        try {
            const beforeTimestamp = Date.now();
            const response = await superagent
                .post(url)
                .type('form')
                .set('Accept', 'application/json')
                .send(form);
            if (response.status !== 200) {
                throw new Error('Response was status code: ' + response.status + ' (' + response.text + ')');
            }
            console.log(url + ' - ' + (Date.now() - beforeTimestamp) + ' miliseconds taken');
            const responseBody = JSON.parse(response.text);
            if (responseBody.status !== 200) {
                throw new Error('Response body had status code: ' + responseBody.status + ' (' + response.text + ')');
            }
            return responseBody;
        } catch (error) {
            throw error;
        }
    }

    private static encryptPassword(password: string, passwordEncryptionKey: string) {
        const cipher = crypto.createCipheriv('bf-ecb', new Buffer(passwordEncryptionKey), new Buffer(''));

        let encrypted = cipher.update(password, 'utf8', 'base64');

        encrypted += cipher.final('base64');

        return encrypted;
    }
}
