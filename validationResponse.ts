import { AccountInfoModel } from '../../../models/Fnp/AccountInfoModel';
import _ from 'lodash';
import Vue from 'vue';
import { UL } from '../../../models/IdentityModels';
import { AnswerInfo, DepoAccountData } from './../../../models/Fnp/FnpAnswer';
import { MainFnpModel } from '../../../models/Fnp/MainFnpModel';


export class ValidationError {
    field: string;
    message: string;
}

export class ValidationStatus {
    hasErrors = false;

    errors: ValidationError[] = [];


    reset() {
        for (let i = 0; i < this.errors.length; i++) {
            Vue.set(this, this.errors[i].field, undefined);
        }
        this.errors.splice(0, this.errors.length);
        this.hasErrors = false;
    }

    add(field: string, error: string) {
        this.errors.push({ field, message: error });
        this.hasErrors = true;
        Vue.set(this, field, error);
    }

    remove(field: string) {
        _.remove(this.errors, e => e.field == field);
        this.hasErrors = this.errors.length > 0;
        Vue.set(this, field, undefined);
    }

    hasFieldError(field: string) {
        return _.some(this.errors, e => e.field == field);
    }

    getError(field: string) {
        let err = _.find(this.errors, e => e.field == field);
        return err ? err.message : err;
    }

    getAllErrors(): string {
        let messages = _.map(this.errors, e => e.message);
        messages = _.filter(messages, m => m != undefined && m != null);
        let result = _.join(messages, '\r\n');
        return result;
    }
}

function ResetModelValidationError(model: DepoAccountData) {
    if (model) {
        model.Errors.reset();
        _.forEach(model.AnswerTypeAccDepo, c => c.Errors.reset());
        _.forEach(model.Debtor, d => d.Errors.reset());
        _.forEach(model.DebtTransactionsInfo, t => t.Errors.reset());
    }
}


// export function validateBeforeDoubleCheck(model: DepoAccountData) {
//     let base = model;
//     let result = true;
//     result = checkBaseDocumentType(base, result);
//     return result;
// }

// export function validatePostverification(model: MainFnpModel) {
//     ResetModelValidationError(model);
//     let result = validatePostverificationImpl(model);
//     return result;
// }


// export function validatePostverificationImpl(model: MainFnpModel
//     let result = true;
//     result = checkCancelReason(model, result);
//     if (base.IsNotWork) {
//     return result;
// }


// result = checkBaseProps(model, result);
// result = checkDebtorsFields(model, result);
// if (model.DocumentBase.IsVziskanie) {

//     result = checkNumber(model, result);
//     result = checkAnswerType(model, result);
//     result = checkOldNumberError(model, result);
//     result = checkCurrencyCode(model, result);
//     result = checkBranchBank(model, result);
//     result = checkBranchBankAddr(model, result);
//     result = checkBalanceBeginPeriod(model, result);
//     result = checkBalanceEndPeriod(model, result);
//     result = checkAmount(model, result);

//     result = checkBrokerAnswerType(model, result);
//     result = checkBrokerStatusList(model, result);
//     result = checkContractType(model, result);
//     result = checkCertificateNumber(model, result);
//     result = checkTypeAnswerCertificate(model, result);
//     result = checkAccDepo(model, result);
//     result = checkTypeAnswerDepo(model, result);
//     result = checkAnswerClassificationSecurity(model, result);
//     result = checkAnswerCategorySecurity(model, result);
//     result = checkRegNumSecurityError(model, result);
//     result = checkISIN(model, result);
//     result = checkBoxNumber(model, result);
//     result = checkAnswerTypeBox(model, result);
//     result = checkContractNumber(model, result);
//     result = checkIdKind(model, result);
//     result = checkIpNo(model, result);
//     result = checkIdDocNo(model, result);
//     result = checkNumContract(model, result);
//     result = checkNumContractCredit(model, result);


// }
// return result;
// }


//ResponseAccountInfo
function checkNumber(model: DepoAccountData, result) {
    _.forEach(model.AnswerTypeAccDepo, c => {
        if (!c.Number || c.Number.length < 20) {
            c.Errors.add('invalidNumber', "Не указан счет/неверное заполнение (не менее 20 символов)");
            result = false;
        }
        else {
            c.Errors.remove('invalidNumber');
        }
    });
    return result;
}

function checkAnswerType(model: MainFnpModel, result) {
    if (!model.Sved) {
        model.Errors.add('answertypeNotDefined', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('answertypeNotDefined');
    }
    return result;
}

function checkOldNumberError(model: AnswerInfo, result) {
    _.forEach(model.OldAccountNumber, c => {
        if (!c.AccOld || c.AccOld.length < 20) {
            c.Errors.add('invalidOldNumber', "Не указан старый счет/неверное заполнение (не менее 20 символов)");
            result = false;
        }
        else {
            c.Errors.remove('invalidOldNumber');
        }
    });
    return result;
}
checkOldNumberError();


function checkCurrencyCode(model: AnswerInfo, result) {
    _.forEach(model.CurrencyCode, c => {
        if (!c.Currency || c.Currency.length < 3) {
            c.Errors.add('invalidCurrencyCode', "Не указан код валюты (не менее 3 символов)");
            result = false;
        }
        else {
            c.Errors.remove('invalidCurrencyCode');
        }
    });
    return result;
}

function checkBranchBank(model: AnswerInfo, result) {
    if (!model.Vsp) {
        model.Errors.add('NotDefinedBranchBankAddr', "Не указано отделение");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedBranchBank');
    }
    return result;
}

function checkBranchBankAddr(model: AnswerInfo, result) {
    if (!model.VspAdrress) {
        model.Errors.add('NotDefinedBranchBankAddr', "Не указан адрес отделения");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedBranchBankAddr');
    }
    return result;
}

function checkBalanceBeginPeriod(model: AnswerInfo, result) {
    _.forEach(model.AmountOnRequestDate, c => {
        if (!c.Statement.BalanceBeginPeriod || c.Statement.BalanceBeginPeriod.length < 3) {
            c.Errors.add('NotDefinedBalanceBeginPeriod', "Не указан остаток на дату смерти");
            result = false;
        }
        else {
            c.Errors.remove('NotDefinedBalanceBeginPeriod');
        }
    });
    return result;
}

function checkBalanceEndPeriod(model: AnswerInfo, result) {
    _.forEach(model.AmountOnRequestDate, c => {
        if (!c.Statement.BalanceEndPeriod || c.Statement.BalanceEndPeriod.length < 3) {
            c.Errors.add('NotDefinedBalanceBeginPeriod', "Не указан остаток на дату запроса");
            result = false;
        }
        else {
            c.Errors.remove('NotDefinedBalanceEndPeriod');
        }
    });
    return result;
}

function checkAmount(model: AnswerInfo, result) {
    _.forEach(model.Amount, c => {
        if (!c.Statement.BalanceEndPeriod || c.Statement.BalanceEndPeriod.length < 3) {
            c.Errors.add('NotDefinedAmount', "Не указан остаток");
            result = false;
        }
        else {
            c.Errors.remove('NotDefinedAmount');
        }
    });
    return result;
}

//ResponseBrokerageAccounts
function checkBrokerAnswerType(model: AnswerInfo, result) {
    if (!model.AnswerTypeAccBrok) {
        model.Errors.add('invalidAnswerSvedBroker', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('invalidAnswerSvedBroker');
    }
    return result;
}

function checkBrokerStatusList(model: AnswerInfo, result) {
    if (!model.Status) {
        model.Errors.add('NotDefinedStatusList', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedStatusList');
    }
    return result;
}


function checkContractType(model: AnswerInfo, result) {
    if (!model.TypeContract) {
        model.Errors.add('NotDefinedContractType', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedContractType');
    }
    return result;
}

//ResponseCertificatesInstance
function checkCertificateNumber(model: AnswerInfo, result) {
    if (!model.CertificateNumber) {
        model.Errors.add('invalidCertificateNumber', "Не указано номер сертификата");
        result = false;
    }
    else {
        model.Errors.remove('invalidCertificateNumber');
    }
    return result;
}

function checkTypeAnswerCertificate(model: AnswerInfo, result) {
    if (!model.AnswerTypeCertificate) {
        model.Errors.add('NotDefinedTypeAnswerCertificate', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedTypeAnswerCertificate');
    }
    return result;
}


//ResponseDepoInfo
function checkAccDepo(model: AnswerInfo, result) {
    if (!model.AccDepo) {
        model.Errors.add('invalidAccDepo', "Не указан номер счета");
        result = false;
    }
    else {
        model.Errors.remove('invalidAccDepo');
    }
    return result;
}

function checkTypeAnswerDepo(model: AnswerInfo, result) {
    if (!model.AnswerTypeAccDepo) {
        model.Errors.add('NotDefinedAnswerTypeAccDepo', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedAnswerTypeAccDepo');
    }
    return result;
}

function checkAnswerClassificationSecurity(model: AnswerInfo, result) {
    if (!model.ClassificationSecurity) {
        model.Errors.add('NotDefinedanswerClassificationSecurity', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedAnswerClassificationSecurity');
    }
    return result;
}

function checkAnswerCategorySecurity(model: AnswerInfo, result) {
    if (!model.CategorySecurity) {
        model.Errors.add('NotDefinedAnswerCategorySecurity', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedAnswerCategorySecurity');
    }
    return result;
}

function checkRegNumSecurityError(model: AnswerInfo, result) {
    if (!model.RegNumSecurity) {
        model.Errors.add('NotDefinedRegNumSecurity', "Не указан номер");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedRegNumSecurity');
    }
    return result;
}

function checkISIN(model: AnswerInfo, result) {
    if (!model.ISIN) {
        model.Errors.add('NotDefinedISIN', "Не указан номер");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedISIN');
    }
    return result;
}


//ResponseDepositary
function checkBoxNumber(model: AnswerInfo, result) {
    if (!model.BoxNumber) {
        model.Errors.add('invalidBoxNumber', "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidBoxNumber');
    }
    return result;
}

function checkAnswerTypeBox(model: AnswerInfo, result) {
    if (!model.AnswerTypeBox) {
        model.Errors.add('NotDefinedAnswerTypeBox', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedAnswerTypeBox');
    }
    return result;
}

function checkContractNumber(model: AnswerInfo, result) {
    if (!model.ContractNumber) {
        model.Errors.add('invalidContractNumber', "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidContractNumber');
    }
    return result;
}

// ResponseEncumbranceInstance
function checkIdKind(model: AnswerInfo, result) {
    if (!model.IdKind) {
        model.Errors.add('NotDefinedIdKind', "Нет сведений");
        result = false;
    }
    else {
        model.Errors.remove('NotDefinedIdKind');
    }
    return result;
}

function checkIpNo(model: AnswerInfo, result) {
    if (!model.IpNo) {
        model.Errors.add('invalidIpNo', "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidIpNo');
    }
    return result;
}

function checkIdDocNo(model: AnswerInfo, result) {
    if (!model.IdDocNo) {
        model.Errors.add('invalidIdDocNo', "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidIdDocNo');
    }
    return result;
}

// ResponseIPCreditInstanceSimpleLoan
function checkNumContract(model: AnswerInfo, result) {
    if (!model.NumContract) {
        model.Errors.add('invalidNumContractError', "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidNumContractError');
    }
    return result;
}

// ResponseCreditInfo
function checkNumContractCredit(model: AnswerInfo, result) {
    if (!model.NumContract) {
        model.Errors.add('invalidNumContractError, "Не указано номер");
        result = false;
    }
    else {
        model.Errors.remove('invalidNumContractError');
    }
    return result;
}





