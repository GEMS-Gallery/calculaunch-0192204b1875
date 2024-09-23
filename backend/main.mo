import Error "mo:base/Error";

import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
    // Addition function
    public func add(x : Float, y : Float) : async Float {
        return x + y;
    };

    // Subtraction function
    public func subtract(x : Float, y : Float) : async Float {
        return x - y;
    };

    // Multiplication function
    public func multiply(x : Float, y : Float) : async Float {
        return x * y;
    };

    // Division function
    public func divide(x : Float, y : Float) : async ?Float {
        if (y == 0) {
            Debug.print("Error: Division by zero");
            return null;
        } else {
            return ?(x / y);
        };
    };
}
