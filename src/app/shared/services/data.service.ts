import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  convertDateTimeToIso(dateTime) {
    const offset = new Date().getTimezoneOffset() / -60;
    dateTime.setTime(dateTime.getTime() + offset * 60 * 60 * 1000);
    dateTime = dateTime.toISOString();
    return dateTime;
  }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjQ3MDY4MTVlLTA4MGEtNDQzYS05ZmIyLTUwNTZjNzRiY2IyZiIsImlkIjoiQVFBQUFBRUFBQ2NRQUFBQUVDelNWUHNuN2tyc3JDMUY1Nlk1Qk1OaHlJRXlyR0dhR21nbjAzR25CSWN3bW16YTdndEx3RTY1dkp0U2owc3pyUT09IiwibmFtZSI6IktoZWRlciBLYXNlbSIsImN1cnJlbmN5IjoiVVNEIiwic3ltYm9sIjoiJCIsIm1hc3RlciI6IlRydWUiLCJhZ2VuY3kiOiIxIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNTk4ODU2ODUxLCJleHAiOjE2MDc0OTY4NTEsImlhdCI6MTU5ODg1Njg1MX0.XA1ROzh2ANGiyakYYsRMvpBoaUmTE-1MlBP8hxGuqIA',
    }),
  };

  reloadBetsObs = new BehaviorSubject<any>(0);
  reloadBets = this.reloadBetsObs.asObservable();

  currentUser: any = {};

  timeOffsets = [
    {
      name: 'UTC-12:00',
      value: -1 * 12 * 60,
    },

    {
      name: 'UTC-11:00',
      value: -1 * 11 * 60,
    },

    {
      name: 'UTC-10:00',
      value: -1 * 10 * 60,
    },

    {
      name: 'UTC-9:30',
      value: -1 * 9.5 * 60,
    },

    {
      name: 'UTC-9:00',
      value: -1 * 9 * 60,
    },

    {
      name: 'UTC-8:00',
      value: -1 * 8 * 60,
    },
    {
      name: 'UTC-9:30',
      value: -1 * 9.5 * 60,
    },

    {
      name: 'UTC-9:00',
      value: -1 * 9 * 60,
    },

    {
      name: 'UTC-8:00',
      value: -1 * 8 * 60,
    },
    {
      name: 'UTC-7:00',
      value: -1 * 7.5 * 60,
    },

    {
      name: 'UTC-6:00',
      value: -1 * 6 * 60,
    },

    {
      name: 'UTC-5:00',
      value: -1 * 5 * 60,
    },
    {
      name: 'UTC-4:00',
      value: -1 * 4.5 * 60,
    },

    {
      name: 'UTC-3:30',
      value: -1 * 3.5 * 60,
    },

    {
      name: 'UTC-3:00',
      value: -1 * 3 * 60,
    },
    {
      name: 'UTC-2:00',
      value: -1 * 2 * 60,
    },

    {
      name: 'UTC-1:00',
      value: -1 * 1 * 60,
    },
    // middle
    {
      name: 'UTC 00:00',
      value: 0 * 60,
    },
    // middle
    {
      name: 'UTC+1:00',
      value: 1 * 60,
    },
    {
      name: 'UTC+2:00',
      value: 2 * 60,
    },

    {
      name: 'UTC+3:00',
      value: 3 * 60,
    },

    {
      name: 'UTC+3:30',
      value: 3.5 * 60,
    },

    {
      name: 'UTC+4:00',
      value: 4 * 60,
    },

    {
      name: 'UTC+4:30',
      value: 4.5 * 60,
    },

    {
      name: 'UTC+5:00',
      value: 5 * 60,
    },

    {
      name: 'UTC+5:30',
      value: 5.5 * 60,
    },

    {
      name: 'UTC+5:45',
      value: 5.75 * 60,
    },

    {
      name: 'UTC+6:00',
      value: 6 * 60,
    },

    {
      name: 'UTC+6:30',
      value: 6.5 * 60,
    },

    {
      name: 'UTC+7:00',
      value: 7 * 60,
    },

    {
      name: 'UTC+8:00',
      value: 8 * 60,
    },

    {
      name: 'UTC+8:45',
      value: 8.75 * 60,
    },

    {
      name: 'UTC+9:00',
      value: 9 * 60,
    },

    {
      name: 'UTC+9:30',
      value: 9.5 * 60,
    },

    {
      name: 'UTC+10:00',
      value: 10 * 60,
    },

    {
      name: 'UTC+10:30',
      value: 10.5 * 60,
    },

    {
      name: 'UTC+11:00',
      value: 11 * 60,
    },

    {
      name: 'UTC+12:00',
      value: 12 * 60,
    },

    {
      name: 'UTC+12:45',
      value: 12.75 * 60,
    },

    {
      name: 'UTC+13:00',
      value: 13 * 60,
    },

    {
      name: 'UTC+14:00',
      value: 14 * 60,
    },
  ];

  loaderOn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllAgencies() {
    return this.http.get<any>(`${environment.apiUrl}agency?status=All`, {
      headers: this.httpOptions.headers,
    });
  }

  getAllLogs() {
    return this.http.get<any>(`${environment.apiUrl}log`, {
      headers: this.httpOptions.headers,
    });
  }

  getAllLogsForDate(
    start: string,
    end: string,
    level: string,
    Type,
    userName,
    IpAddress,
    pageIndex: number,
    pageSize: number
  ) {
    this.currentUser;

    // pageNumber=1&pageSize=100&startDate=08/31/2020&endDate=08/31/2020&level=Info

    return this.http.get<any>(
      `${environment.apiUrl}log${
        '?startDate=' +
        start +
        '&endDate=' +
        end +
        '&level=' +
        level +
        '&Type=' +
        Type +
        '&userName=' +
        userName +
        '&IpAddress=' +
        IpAddress +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString()
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  GetDashboard(start: string, end: string, userId: string) {
    return this.http.get<any>(
      `${environment.apiUrl}report/dashboard${
        '?startDate=' + start + '&endDate=' + end + '&userid=' + userId
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  submitDepositForm(depositFormToPost) {
    return this.http.put<any>(
      `${environment.apiUrl}user/${depositFormToPost.userId}/credit`,
      depositFormToPost,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  submitPaymentDepositForm(depositFormToPost) {
    return this.http.post(
      `${environment.apiUrl}payment/transaction`,
      depositFormToPost,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  submitDetailsForm(detailsFormToSubmit) {
    return this.http.put(
      `${environment.apiUrl}agency/${detailsFormToSubmit.id}`,
      detailsFormToSubmit,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  GetRisks(promoterId = '', shopId = '') {
    return this.http.get<any>(
      `${environment.apiUrl}risk${'?parentId=' + promoterId}&ShopId=${shopId}`,
      { headers: this.httpOptions.headers }
    );
  }

  GetRisksNotShops(BO, OC) {
    return this.http.get<any>(
      `${environment.apiUrl}risk${'?IsOffice=' + BO}&IsOnline=${OC}`,
      { headers: this.httpOptions.headers }
    );
  }

  GetBetById(id) {
    return this.http.get<any>(`${environment.apiUrl}Bet/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  GetBets(
    search,
    startDate,
    endDate,
    userId,
    betType,
    statusType,
    AgencyId,
    stakeLower,
    stakeUpper,
    payoutLower,
    payoutUpper,
    pageSize,
    pageIndex,
    parentId = '',
    shopId = '',
    isActionDate,
    SelectionType
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}Bet${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&Status=' +
        statusType +
        '&MinStake=' +
        stakeLower +
        '&MaxStake=' +
        stakeUpper +
        '&MinPayout=' +
        payoutLower +
        '&MaxPayout=' +
        payoutUpper +
        '&UserId=' +
        userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&isActionDate=' +
        isActionDate +
        '&SelectionType=' +
        SelectionType +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  GetApproveBets(
    search,
    startDate,
    endDate,
    betType,
    parentId = '',
    shopId = '',
    pageSize,
    pageIndex,
    userId = '',
    riskApprovalStatus = 'All'
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}Bet${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&RiskApproval=true' + // uncomment this line later
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&RiskApprovalStatus=' +
        riskApprovalStatus +
        '&UserId=' +
        userId +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  getTotalBets(
    search,
    startDate,
    endDate,
    userId,
    betType,
    statusType,
    AgencyId,
    stakeLower,
    stakeUpper,
    payoutLower,
    payoutUpper,
    pageSize,
    pageIndex,
    parentId = '',
    shopId,
    isActionDate = false,
    SelectionType
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}total${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&Status=' +
        statusType +
        // "&AgencyId=" +
        // AgencyId +
        '&MinStake=' +
        stakeLower +
        '&MaxStake=' +
        stakeUpper +
        '&MinPayout=' +
        payoutLower +
        '&MaxPayout=' +
        payoutUpper +
        '&UserId=' +
        userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&isActionDate=' +
        isActionDate +
        '&SelectionType=' +
        SelectionType +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  GetBetsOffice(
    search,
    startDate,
    endDate,
    userId,
    betType,
    statusType,
    AgencyId,
    stakeLower,
    stakeUpper,
    payoutLower,
    payoutUpper,
    pageSize,
    pageIndex,
    parentId = '',
    shopId = '',
    isActionDate = false,
    SelectionType = '',
    shopType = ''
  ) {
    const offset = new Date().getTimezoneOffset();
    return this.http.get<any>(
      `${environment.apiUrl}Office${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&Status=' +
        statusType +
        '&MinStake=' +
        stakeLower +
        '&MaxStake=' +
        stakeUpper +
        '&MinPayout=' +
        payoutLower +
        '&MaxPayout=' +
        payoutUpper +
        '&UserId=' +
        shopType +
        // userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&SelectionType=' +
        SelectionType +
        '&ShopType=' +
        shopType +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  getTotalOfficeBets(
    search,
    startDate,
    endDate,
    userId,
    betType,
    statusType,
    AgencyId,
    stakeLower,
    stakeUpper,
    payoutLower,
    payoutUpper,
    pageSize,
    pageIndex,
    parentId = '',
    shopId,
    isActionDate = false,
    SelectionType,
    shopType = ''
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}office/total${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&Status=' +
        statusType +
        '&AgencyId=' +
        AgencyId +
        '&MinStake=' +
        stakeLower +
        '&MaxStake=' +
        stakeUpper +
        '&MinPayout=' +
        payoutLower +
        '&MaxPayout=' +
        payoutUpper +
        '&UserId=' +
        shopType +
        // userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&isActionDate=' +
        isActionDate +
        '&SelectionType=' +
        SelectionType +
        '&ShopType=' +
        shopType +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  changeAgencyStatus(agency) {
    return this.http.put(`${environment.apiUrl}agency/${agency.id}`, agency, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  deleteAgency(agency) {
    return this.http.put(`${environment.apiUrl}agency/${agency.id}`, agency, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  createAgency(agency) {
    return this.http.post(`${environment.apiUrl}agency/`, agency, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateRisk(risk) {
    return this.http.put(`${environment.apiUrl}risk/${risk.id}`, risk, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // Users Page Functions

  getUsersSearch(userType, searchQuery = '') {
    return this.http.get<any>(
      `${environment.apiUrl}user?roles=${userType}&pageSize=10&searchQuery=${searchQuery}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getUsers(userType, searchQuery = '') {
    return this.http.get<any>(
      `${environment.apiUrl}user?roles=${userType}&pageSize=100&searchQuery=${searchQuery}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getUserById(userId) {
    return this.http.get<any>(`${environment.apiUrl}user/${userId}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getShopForPromoter(promoterId) {
    return this.http.get<any[any]>(
      `${environment.apiUrl}user?Roles=Shop&ParentId=${promoterId}&pageSize=100`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getBonus(promoter = '', shop = ''): any {
    return this.http.get(
      // `${environment.apiUrl}bonus/?Status=All`,
      `${environment.apiUrl}bonus/?parentId=${promoter}&ShopId=${shop}&IsOffice=false&IsOnline=false&Status=All`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getBonusNotShop(isOffice = 'flase', isOnline = 'flase'): any {
    return this.http.get(
      // `${environment.apiUrl}bonus/?Status=All`,
      `${environment.apiUrl}bonus/?IsOffice=${isOffice}&IsOnline=${isOnline}&Status=All`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  updateBonus(bonus) {
    return this.http.put(`${environment.apiUrl}bonus/${bonus.id}`, bonus, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  AddBonus(bonus) {
    return this.http.post(`${environment.apiUrl}bonus`, bonus, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getAgencies() {
    return this.http.get<any>(`${environment.apiUrl}agency/`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  submitNewUserForm(user) {
    return this.http.post<any>(`${environment.apiUrl}user`, user, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  submitNewPasswordForUser(userId, newPassword) {
    return this.http.post<any>(
      `${environment.apiUrl}user/${userId}/password`,
      { newPassword: newPassword },
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // sports start here

  GetSports() {
    return this.http.get<any>(`${environment.sportsApiUrl}sport?IsAll=True`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  GetRegions(sportId) {
    return this.http.get<any>(
      `${environment.sportsApiUrl}region?IsAll=True&sportId=${sportId}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  GetLeagues(sportId, RegionId) {
    return this.http.get<any>(
      // `${environment.sportsApiUrl}league?IsAll=True&sportId=${sportId}&RegionId=${RegionId}`,
      `${environment.sportsApiUrl}league?isActive=False&sportId=${sportId}&RegionId=${RegionId}&IsAll=True`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  // getLeaguesActive(){
  //   return this.http.get<any>(
  //     `${environment.sportsApiUrl}league?IsAll=false`,
  //     {
  //       headers: this.httpOptions.headers,
  //       observe: "response",
  //     }
  //   );
  // }

  updateSport(sport) {
    return this.http.put(
      `${environment.sportsApiUrl}sport/${sport.sportId}`,
      sport,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  updateRegion(region) {
    return this.http.put(
      `${environment.sportsApiUrl}region/${region.regionId}`,
      region,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  updateLeague(league) {
    return this.http.put(
      `${environment.sportsApiUrl}league/${league.leagueId}`,
      league,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  /////////

  getLiveMatches() {
    return this.http.get<any>(`${environment.sportsApiUrl}live`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getPreMatches(leagueId) {
    return this.http.get<any>(
      `${environment.sportsApiUrl}pre${'?leagueId=' + leagueId}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // getDisbaledMatches( ) {
  //   return this.http.get<any>(
  //     `${environment.apiUrl}event/disable`,
  //     { headers: this.httpOptions.headers, observe: "response" }
  //   );
  // }

  // enableMatch(match) {
  //   return this.http.put(
  //     `${environment.apiUrl}event/enable`,
  //     match,
  //     {
  //       headers: this.httpOptions.headers,
  //       observe: "response",
  //     }
  //   );
  // }

  // disableMatch(match,isLive) {
  //   return this.http.put(
  //     `${environment.apiUrl}event/disable?isLive=${isLive}`,
  //     match,
  //     {
  //       headers: this.httpOptions.headers,
  //       observe: "response",
  //     }
  //   );
  // }

  getDisbaledMatches() {
    return this.http.get<any>(`${environment.sportsApiUrl}deactivatedmatch`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  enableMatch(match) {
    return this.http.delete(
      `${environment.sportsApiUrl}deactivatedmatch/${match.id}`,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  disableMatch(match, isLive) {
    return this.http.post(
      `${environment.sportsApiUrl}deactivatedmatch?isLive=${isLive}`,
      match,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  /////////

  getBetsForAgencyAndDate(
    start: string,
    end: string,
    agencyId: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}agency/${agencyId}/history${
        '?startDate=' +
        start +
        '&endDate=' +
        end +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString()
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getSubAccounts(userId) {
    let creditType = status;
    return this.http.get<any>(
      `${environment.apiUrl}user/subAccounts/${userId}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getBetsForUserAndDate(
    startDate: string,
    endDate: string,
    userId: string,
    statusType,
    pageIndex: number,
    pageSize: number,
    isActionDate,
    shopId,
    parentId
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}bet${
        '?StartDate=' +
        startDate +
        '&endDate=' +
        endDate +
        '&BetType=' +
        '' +
        '&Status=' +
        statusType +
        '&MinStake=' +
        0 +
        '&MaxStake=' +
        0 +
        '&MinPayout=' +
        0 +
        '&MaxPayout=' +
        0 +
        '&UserId=' +
        userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        '' +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&isActionDate=' +
        isActionDate +
        '&SelectionType=' +
        '' +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getTransactionForAgency(
    start: string,
    end: string,
    agencyId: string,
    pageIndex: number,
    pageSize: number,
    status: string
  ) {
    let isWithdraw, isDeposit;
    switch (status) {
      case 'All':
        isWithdraw = false;
        isDeposit = false;
        break;
      case 'Withdraw':
        isWithdraw = true;
        isDeposit = false;
        break;
      case 'Deposit':
        isWithdraw = false;
        isDeposit = true;
        break;
    }
    return this.http.get<any>(
      `${environment.apiUrl}agency/${agencyId}/thistory${
        '?startDate=' +
        start +
        '&endDate=' +
        end +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&isWithdraw=' +
        isWithdraw +
        '&isDeposit=' +
        isDeposit
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getTransactionForUser(
    start: string,
    end: string,
    userId: string,
    pageIndex: number,
    pageSize: number,
    status: string
  ) {
    let creditType = status;
    return this.http.get<any>(
      `${environment.apiUrl}user/${userId}/thistory${
        '?startDate=' +
        start +
        '&endDate=' +
        end +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&creditType=' +
        creditType
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getTransactionHistory(
    start: string,
    end: string,
    pageIndex: number,
    pageSize: number,
    status: string,
    isInternal,
    isBet,
    userId = ''
  ) {
    let creditType = status;
    return this.http.get<any>(
      `${environment.apiUrl}tool/transaction${
        '?startDate=' +
        start +
        '&endDate=' +
        end +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&creditType=' +
        creditType +
        '&IsInternal=' +
        isInternal +
        '&IsBet=' +
        isBet +
        '&userId=' +
        userId
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  setBetVoid(modal) {
    return this.http.put(`${environment.apiUrl}bet/${modal.id}/void`, modal, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  changeBetsOdds(betId, newRate) {
    // takes offset
    return this.http.post(
      `${environment.apiUrl}tool/${betId}/change/${newRate}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  setBetVoidMaster(modal) {
    // takes offset
    return this.http.post(
      `${environment.apiUrl}tool/${modal.id}/void`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  setBetSelectionWin(betId, selectionId) {
    // takes offset

    return this.http.post(
      `${environment.apiUrl}tool/${betId}/win/${selectionId}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  setBetSelectionLoss(betId, selectionId) {
    // takes offset

    return this.http.post(
      `${environment.apiUrl}tool/${betId}/loss/${selectionId}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  setBetSelectionVoid(betId, selectionId) {
    // takes offset

    return this.http.post(
      `${environment.apiUrl}tool/${betId}/void/${selectionId}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  setBetPayout(id) {
    return this.http.put(
      `${environment.apiUrl}office/${id}`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  updateBet(bet) {
    return this.http.put(`${environment.apiUrl}bet/${bet.id}`, bet, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  acceptBet(bet) {
    return this.http.put(
      `${environment.apiUrl}bet/${bet.id}/accept`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  rejectBet(bet) {
    return this.http.put(
      `${environment.apiUrl}bet/${bet.id}/reject`,
      {},
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  submitChangesForUser(user) {
    return this.http.put(`${environment.apiUrl}user/${user.id}`, user, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  addRisk(risk) {
    return this.http.post(`${environment.apiUrl}risk/`, risk, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getRiskMost(
    start: string,
    end: string,
    sportId,
    regionId,
    leagueId,
    pageIndex = 0,
    pageSize = 0
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}risk/most?${
        'StartDate=' +
        start +
        '&EndDate=' +
        end +
        '&sportId=' +
        sportId +
        '&regionId=' +
        regionId +
        '&leagueId=' +
        leagueId
        // +
        // '&pageSize=' +
        // pageSize.toString() +
        // '&pageNumber=' +
        // pageIndex.toString()
      }`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getPromoters(): Observable<any[any]> {
    return this.http.get<any[]>(`${environment.apiUrl}user?Roles=Promoter`, {
      headers: this.httpOptions.headers,
    });
  }

  usernameAvailable(username) {
    return this.http.post<any>(
      `${environment.apiUrl}user/check/${username}`,
      {},
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getCurrenciesRate() {
    return this.http.get<any>(`${environment.apiUrl}currency`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateCurrencyRate(id, obj) {
    return this.http.put<any>(`${environment.apiUrl}currency/${id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  submitUserDepositForm(depositFormToPost) {
    return this.http.put<any>(
      `${environment.apiUrl}user/${depositFormToPost.userId}/credit`,
      depositFormToPost,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  GetRiskMostSingle(eventName, obj) {
    return this.http.post<any>(
      `${environment.apiUrl}Risk/Most/Single?eventName=${eventName}`,
      obj,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getBalanceForUser(userId) {
    return this.http.get(
      `${environment.apiUrl}user/${userId}/balance`,
      this.httpOptions
    );
  }

  collectBalanceForUser(userId) {
    return this.http.put(
      `${environment.apiUrl}user/${userId}/collect?isClear=false`,
      {},
      this.httpOptions
    );
  }

  getProfitReport(startDate, endDate, pageSize, pageNumber) {
    startDate = startDate.split('T')[0];
    endDate = endDate.split('T')[0];
    return this.http.get<any>(
      `${
        environment.apiUrl
      }report/profit?startDate=${startDate}&endDate=${endDate}&pageSize=${pageSize.toString()}$pageNumber=${pageNumber.toString()}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getBalanceReport(startDate, endDate, pageSize, pageNumber) {
    startDate = startDate.split('T')[0];
    endDate = endDate.split('T')[0];

    return this.http.get<any>(
      `${
        environment.apiUrl
      }report/balance?startDate=${startDate}&endDate=${endDate}&pageSize=${pageSize.toString()}$pageNumber=${pageNumber.toString()}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getWinLoseReport(startDate, endDate, queryVariables) {
    startDate = startDate.split('T')[0];
    endDate = endDate.split('T')[0];

    return this.http.get<any>(
      `${environment.apiUrl}report/total?startDate=${startDate}
      &endDate=${endDate}&stake=${queryVariables.stake}&payout=${queryVariables.payout}
      &bonus=${queryVariables.bonus}&running=${queryVariables.runningBets}&voided=${queryVariables.voided}
      &commission=${queryVariables.commission}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getPaymentReport(startDate, endDate, pageSize, pageNumber) {
    startDate = startDate.split('T')[0];
    endDate = endDate.split('T')[0];

    return this.http.get<any>(
      `${
        environment.apiUrl
      }report/payment?startDate=${startDate}&endDate=${endDate}&pageSize=${pageSize.toString()}$pageNumber=${pageNumber.toString()}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getCustomerSelectionsReport(startDate, endDate, userId, isActionDate) {
    return this.http.get<any>(
      `${environment.apiUrl}report/customer/selection?startDate=${startDate}&endDate=${endDate}&userId=${userId}&isActionDate=${isActionDate}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  GetBetsReport(
    search,
    startDate,
    endDate,
    userId,
    betType,
    statusType,
    AgencyId,
    stakeLower,
    stakeUpper,
    payoutLower,
    payoutUpper,
    pageSize,
    pageIndex,
    parentId = '',
    shopId = '',
    isActionDate,
    SelectionType
  ) {
    const offset = new Date().getTimezoneOffset();

    return this.http.get<any>(
      `${environment.apiUrl}report/Bet${
        '?StartDate=' +
        startDate +
        '&EndDate=' +
        endDate +
        '&BetType=' +
        betType +
        '&Status=' +
        statusType +
        '&MinStake=' +
        stakeLower +
        '&MaxStake=' +
        stakeUpper +
        '&MinPayout=' +
        payoutLower +
        '&MaxPayout=' +
        payoutUpper +
        '&UserId=' +
        userId +
        '&pageSize=' +
        pageSize.toString() +
        '&pageNumber=' +
        pageIndex.toString() +
        '&SearchQuery=' +
        search +
        '&parentId=' +
        parentId +
        '&shopId=' +
        shopId +
        '&isActionDate=' +
        isActionDate +
        '&SelectionType=' +
        SelectionType +
        '&offset=' +
        offset
      }`,
      { headers: this.httpOptions.headers }
    );
  }

  autoCompleteEvent(search) {
    return this.http.get<any>(
      // ` http://193.140.43.71:8080/games?teamSearch=${search}`,
      // `${environment.socketUrl}/games?teamSearch=${search}`,
      // `${environment.sportsApiUrl}pre?teamSearch=${search}`,
      `${environment.sportsApiUrl}pre/paginate?teamSearch=${search}&pageNo=1&pageSize=10`,
      {
        headers: this.httpOptions.headers,
        // headers: { authorization: environment.apiKey },
      }
    );

    // http://193.140.43.76:8080/games?teamSearch=barc
  }

  riskCalculation(events) {
    return this.http.post<any>(
      // `http://193.140.43.71/api/v1/risk/calculate`,
      `${environment.apiUrl}risk/calculate`,
      events,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getPayments():any {
    return this.http.get(
      // `${environment.apiUrl}bonus/?Status=All`,
      `${environment.apiUrl}payment`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  updatePayment(payment) {
    return this.http.put(
      `${environment.apiUrl}payment/${payment.id}`,
      payment,
      {
        headers: this.httpOptions.headers,
        observe: 'response',
      }
    );
  }

  AddPayment(payment) {
    return this.http.post(`${environment.apiUrl}payment`, payment, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getPaymentsTransactionHistory(start, end, id, status) {
    return this.http.get<any>(
      `${environment.apiUrl}payment/transaction?PaymentId=${id}&StartDate=${start}&EndDate=${end}&Status=${status}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  getTelerikReport(isNew, leagues) {
    return this.http.post<any>(
      `${environment.apiUrl}report/league/events/${isNew}`,
      leagues,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  ///////////////////////////////////////////

  getIPsList() {
    return this.http.get<any>(`${environment.apiUrl}risk/ip`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  addNewIP(IP) {
    const ipAddress = IP;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post<any>(
      `${environment.apiUrl}risk/ip`,
      `\"${ipAddress}\"`,
      options
    );
  }

  deleteIP(IP) {
    const ipAddress = IP;

    // return this.http
    // .request('DELETE',  `${environment.apiUrl}risk/ip`

    // , { params: { ipAddress: ipAddress}
    // ,headers:new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: "Bearer " + localStorage.getItem("token")
    // })
    // , body: `\"${ipAddress}\"`}

    // )
    // .map(this.getResponseData)
    // .catch(this.handleError);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      body: `\"${ipAddress}\"`,
    };

    return this.http.delete<any>(`${environment.apiUrl}risk/ip`, options);
  }

  getLoginLog(startDate, endDate) {
    return this.http.get<any>(
      `${environment.apiUrl}log/login?start=${startDate}&end=${endDate}`,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  // Odd Change Controller Functions

  getOddsChangedList() {
    return this.http.get<any>(`${environment.sportsApiUrl}odds`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  changeOddsForMatch(odds) {
    return this.http.put<any>(`${environment.sportsApiUrl}odds`, odds, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  getSettings() {
    return this.http.get<any>(`${environment.apiUrl}tool/settings`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateSettings(obj) {
    return this.http.put<any>(`${environment.apiUrl}tool/settings`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  ///////////////////////////////// not API functions

  formatNumber(num: any, isMoney = true) {
    num = Number(num);
    if (num === 0) {
      return 0;
    }
    if (isMoney) {
      num = num.toFixed(2);
    } else if (num.toString().includes('.')) {
      num = num.toFixed(2);
    }

    let numTr = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return numTr;
  }

  returnDateTime(date = null) {
    if (date == null) {
      const hfa = new Date();

      date = hfa.toISOString();

      const offset = new Date().getTimezoneOffset();

      const dateToReturn = new Date(date);

      const m = dateToReturn.getMinutes();

      // dateToReturn.setMinutes( dateToReturn.getMinutes() - offset);

      return dateToReturn;
    }
    const offset = new Date().getTimezoneOffset();

    const dateToReturn = new Date(date);

    const m = dateToReturn.getMinutes();

    dateToReturn.setMinutes(dateToReturn.getMinutes() - offset);

    return dateToReturn;
  }

  // returnDateTimeToSend(date){

  //   const offset = new Date().getTimezoneOffset();

  //    const dateToReturn = new Date(date);

  //   const m = dateToReturn.getMinutes();

  //   dateToReturn.setMinutes( dateToReturn.getMinutes() + offset);

  //    return dateToReturn;
  // }

  returnDateTimeIso(date = null) {
    const offset = new Date().getTimezoneOffset();

    let dateToReturn = new Date();
    if (date !== null) {
      dateToReturn = new Date(date);
    }

    dateToReturn.setMinutes(dateToReturn.getMinutes() - offset);

    const dateRet = dateToReturn.toISOString();
    return dateRet;
  }

  returnMachineDate() {
    // old was  ==> new Date().toISOString().split("T")[0];

    // yyyy-mm-dd

    let yyyy = new Date().getFullYear().toString();
    let mm = (new Date().getMonth() + 1).toString();
    let dd = new Date().getDate().toString();

    let mmChars = mm.split('');
    let ddChars = dd.split('');

    return (
      yyyy +
      '-' +
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '-' +
      (ddChars[1] ? dd : '0' + ddChars[0])
    );
  }
}
