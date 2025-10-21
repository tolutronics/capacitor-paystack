import Foundation
import Capacitor
import Paystack

/**
 * Paystack Capacitor Plugin for iOS
 * Integrates Paystack payment SDK with Capacitor applications
 */
@objc(PaystackCapacitor)
public class PaystackCapacitor: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "PaystackCapacitor"
    public let jsName = "PaystackCapacitor"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addCard", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "validateCard", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addChargeParameters", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCardType", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "putChargeMetadata", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "putChargeCustomFields", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setChargeEmail", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setChargeAmount", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAccessCode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "chargeCard", returnType: CAPPluginReturnPromise)
    ]
    
    var publicKey: String!
    var email: String!
    var amount: UInt!
    
    var cardParams: PSTCKCardParams! //.init()
    var charge: PSTCKTransactionParams!
    
    func getCallValue<T>(_ name: String, _ call: CAPPluginCall, _ type: T) -> T? {
        return nil
    }
    
    @objc func initialize(_ call: CAPPluginCall) {
        guard let publicKey = call.getString("publicKey") else {
            call.reject("Public key is required")
            return
        }

        self.publicKey = publicKey
        Paystack.setDefaultPublicKey(self.publicKey)
        self.cardParams = nil
        self.charge = nil
        call.resolve([
            "initialized": true
        ])
    }
    
    @objc func addCard(_ call: CAPPluginCall) {
        guard let cardNumber = call.getString("cardNumber"),
              let expiryMonthStr = call.getString("expiryMonth"),
              let expiryYearStr = call.getString("expiryYear"),
              let cvv = call.getString("cvv") else {
            call.reject("Missing required card parameters")
            return
        }

        let expiryMonth = UInt(expiryMonthStr) ?? 0
        let expiryYear = UInt(expiryYearStr) ?? 0

        self.charge = PSTCKTransactionParams.init()
        self.cardParams = PSTCKCardParams.init()
        self.cardParams.number = cardNumber
        self.cardParams.expMonth = expiryMonth
        self.cardParams.expYear = expiryYear
        self.cardParams.cvc = cvv
        call.resolve()
    }
    
    @objc func validateCard(_ call: CAPPluginCall) {
        guard let cardParams = self.cardParams else {
            call.reject("Card not initialized. Call addCard first.")
            return
        }

        let validationState = PSTCKCardValidator.validationState(forCard: cardParams)
        switch validationState {
             case .valid:
                call.resolve(["is_valid": true])
             case .invalid:
                call.resolve(["is_valid": false])
             case .incomplete:
                call.resolve(["is_valid": false])
        }
    }
    
    @objc func addChargeParameters(_ call: CAPPluginCall) {
        let params = call.options as NSDictionary? as? NSMutableDictionary
        do {
            if params != nil {
                try self.charge.setMetadataValueDict(params!, forKey: "custom_filters")
            }
            call.resolve()
        } catch {
            call.reject("\(error)")
        }
    }
    
    @objc func getCardType(_ call: CAPPluginCall) {
        let card = PSTCKCard();
        card.number = self.cardParams.number
        card.cvc = self.cardParams.cvc
        card.expYear = self.cardParams.expYear
        card.expMonth = self.cardParams.expMonth
        call.resolve([
            "card_type": card.type
        ])
    }
    
    @objc func putChargeMetadata(_ call: CAPPluginCall) {
        let params = call.options
        params?.forEach { arg in
            let (key, value) = arg
            do {
                print(key as! String)
                try self.charge.setMetadataValue(value as! String, forKey: key as! String)
            } catch {
                call.reject("\(error)")
            }
        }
        call.resolve()
    }
    
    @objc func putChargeCustomFields(_ call: CAPPluginCall) {
        let params = call.options
        params?.forEach { arg in
            let (key, value) = arg
            do {
                print(key as! String)
                try self.charge.setCustomFieldValue(value as! String, displayedAs: key as! String)
            } catch {
                call.reject("\(error)")
                return
            }
        }
        call.resolve()
    }
    
    @objc func setChargeEmail(_ call: CAPPluginCall) {
        self.email = call.getString("email", "");
        call.resolve()
    }
    
    @objc func setChargeAmount(_ call: CAPPluginCall) {
        guard let amountStr = call.getString("amount") else {
            call.reject("Amount is required")
            return
        }
        self.amount = UInt(amountStr) ?? 0
        call.resolve()
    }
    
    @objc func setAccessCode(_ call: CAPPluginCall) {
        guard let accessCode = call.getString("accessCode") else {
            call.reject("Access code is required")
            return
        }
        self.charge.access_code = accessCode
        call.resolve()
    }
    
    @objc func chargeCard(_ call: CAPPluginCall) {
        guard let cardParams = self.cardParams else {
            call.reject("Card not initialized. Call addCard first.")
            return
        }

        guard let charge = self.charge else {
            call.reject("Charge not initialized.")
            return
        }

        guard let bridge = self.bridge,
              let viewController = bridge.viewController else {
            call.reject("Bridge or view controller not available")
            return
        }

        charge.amount = self.amount
        charge.email = self.email
        charge.currency = "NGN"

        PSTCKAPIClient.shared().chargeCard(cardParams, forTransaction: charge, on: viewController,
               didEndWithError: { (error, reference) -> Void in
                call.reject("\(error)")
            }, didRequestValidation: { (reference) -> Void in
                // an OTP was requested, transaction has not yet succeeded
            }, didTransactionSuccess: { (reference) -> Void in
                // transaction may have succeeded, please verify on backend
                call.resolve(["reference": reference])
        })
    }
}
