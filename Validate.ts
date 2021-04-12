import Vuex, { mapGetters } from 'vuex';
import { Module, Action, Mutation, VuexModule, MutationAction } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Validate extends VuexModule {
    isValidateAccount: boolean = false;
    isValidateBrokerageAccount: boolean = false;
    isValidateCertificate: boolean = false;
    isValidateCredit: boolean = false;
    isValidateDepo: boolean = false;
    isValidateDepositary: boolean = false;
    isValidateDepositBoxInstance: boolean = false;
    isValidateEncum: boolean = false;
    isValidateIPCredit: boolean = false;
    isValidateIPCreditInstanceCredLine: boolean = false;    
    isValidateCreditInfo: boolean = false; 
    isValidateIpAccounts: boolean = false; 
        

    @Mutation
    setAccountValidate(value: boolean) {
        this.isValidateAccount = value;
    }
    get AccountValidate() {
        return this.isValidateAccount
    }
    @Mutation
    setBrokerageAccountValidate(value: boolean) {
        this.isValidateBrokerageAccount = value;
    }
    get BrokerageAccountValidate() {
        return this.isValidateBrokerageAccount
    }
    @Mutation
    setCertificateValidate(value: boolean) {
        this.isValidateCertificate = value;
    }
    get CertificateValidate() {
        return this.isValidateCertificate
    }
    @Mutation
    setCreditValidate(value: boolean) {
        this.isValidateCredit = value;
    }
    get CreditValidate() {
        return this.isValidateCredit
    }
    @Mutation
    setDepoValidate(value: boolean) {
        this.isValidateDepo = value;
    }
    get DepoValidate() {
        return this.isValidateDepo
    }
    @Mutation
    setDepositaryValidate(value: boolean) {
        this.isValidateDepositary = value;
    }
    get DepositaryValidate() {
        return this.isValidateDepositary
    }
    @Mutation
    setDepositBoxInstanceValidate(value: boolean) {
        this.isValidateDepositBoxInstance = value;
    }
    get DepositBoxInstanceValidate() {
        return this.isValidateDepositBoxInstance
    }
    @Mutation
    setEncumValidate(value: boolean) {
        this.isValidateEncum = value;
    }
    get EncumValidate() {
        return this.isValidateEncum
    }
    @Mutation
    setCreditInfoValidate(value: boolean) {
        this.isValidateCreditInfo = value;
    }
    get CreditInfoValidate() {
        return this.isValidateCreditInfo
    }
    @Mutation
    setIPCreditValidate(value: boolean) {
        this.isValidateIPCredit = value;
    }
    get IPCreditValidate() {
        return this.isValidateIPCredit
    }
    @Mutation
    setIPCreditInstanceCredLineValidate(value: boolean) {
        this.isValidateIPCreditInstanceCredLine = value;
    }
    get IPCreditInstanceCredLineValidate() {
        return this.isValidateIPCreditInstanceCredLine
    }
    @Mutation
    setIpAccountsValidate(value: boolean) {
        this.isValidateIpAccounts = value;
    }
    get IpAccountsValidate() {
        return this.isValidateIpAccounts
    }
    get statusOfAllChecks(){
       return this.isValidateAccount && this.isValidateBrokerageAccount && this.isValidateCertificate
            && this.isValidateCredit && this.isValidateDepo && this.isValidateDepositary
                && this.isValidateDepositBoxInstance && this.isValidateEncum && this.isValidateCreditInfo
                    && this.isValidateIPCredit && this.isValidateIPCreditInstanceCredLine
                        && this.isValidateIpAccounts;
    }
}
