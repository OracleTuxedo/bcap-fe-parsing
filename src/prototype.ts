import { convertStringToObject } from "./sky/mapper/Decoder";
import { Car, Tire } from "./dto/Car";
import { convertObjectToString } from "./sky/mapper/Encoder";

export function prototype() {
  // const input = "AsepBudi9870002akuka90110001leo";
  // console.log(input);

  // const input =
  //   "Avanza    Ride In Comfort     024200000000" +
  //   "00000004" +
  //   "Potenza   Performance Boost   0323600000Murah Meriah Banget " +
  //   "Turanza   Fuel Efficiency     0323600000Durability Patent   " +
  //   "Alenza    CUVs & SUVs         0323600000Favorite BapakBapack" +
  //   "Duravis   Durable & Endurance 0323600000Bisa menyelam laut  ";

  const input =
    "Avanza    " +
    "00000004" +
    "Potenza   Performance Boost   0323600000Murah Meriah Banget " +
    "Turanza   Fuel Efficiency     0323600093Durability Patent   " +
    "Alenza    CUVs & SUVs         0323600087Favorite BapakBapack" +
    "Duravis   Durable & Endurance 0323600090Bisa menyelam laut  " +
    "Ride In Comfort     024200000000";

  // const leput =
  //   "Avanza    " +
  //   "00000004" +
  //   "Potenza   Performance Boost   0003236000Murah Meriah Banget " +
  //   "Turanza   Fuel Efficiency     0003236000Durability Patent   " +
  //   "Alenza    CUVs & SUVs         0003236000Favorite BapakBapack" +
  //   "Duravis   Durable & Endurance 0003236000Bisa menyelam laut  " +
  //   "Ride In Comfort     000242000000";

  // console.log(`[${leput}]`);
  // const input =
  // "Avanza    00000004Potenza   Performance Boost   0000032360Murah Meriah Banget Turanza   Fuel Efficiency     0000032360Durability Patent   Alenza    CUVs & SUVs         0000032360Favorite BapakBapackDuravis   Durable & Endurance 0000032360Bisa menyelam laut  Ride In Comfort     000002420000";
  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("START DECODER");
  console.log(`[${input}]`);
  const carParsed: Car | null = convertStringToObject({
    index: 0,
    input: input,
    targetClass: Car,
  });
  // const parsed = parseStringToObject(input, Dog);

  console.log("RESULT");
  console.log(carParsed);

  console.log(carParsed?.name);

  console.log("END DECODER");

  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("START ENCODER");
  const tire1: Tire = new Tire();
  tire1.product = "Potenza";
  tire1.type = "Performance Boost";
  tire1.price = 3236000;
  tire1.description = "Murah Meriah Banget";

  const tire2: Tire = new Tire();
  tire2.product = "Turanza";
  tire2.type = "Fuel Efficiency";
  tire2.price = 3236000.93;
  tire2.description = "Durability Patent";

  const tire3: Tire = new Tire();
  tire3.product = "Alenza";
  tire3.type = "CUVs & SUVs";
  tire3.price = 3236000.87;
  tire3.description = "Favorite BapakBapack";

  const tire4: Tire = new Tire();
  tire4.product = "Duravis";
  tire4.type = "Durable & Endurance";
  tire4.price = 3236000.9;
  tire4.description = "Bisa menyelam laut";

  const car: Car = new Car();
  car.name = "Avanza";
  car.description = "Ride In Comfort";
  car.price = 242000000;
  car.tires = [tire1, tire2, tire3, tire4];

  console.log(car);

  const carString = convertObjectToString(car);

  console.log(`[${carString}]`);

  console.log("END ENCODER");

  console.log(
    "------------------------------------------------------------------------------------"
  );

  input === carString ? console.log("SUCCESS MATCH") : console.log("NOT MATCH");

  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log(
    "------------------------------------------------------------------------------------"
  );
}
