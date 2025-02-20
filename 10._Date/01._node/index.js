

const UTC_DATE = new Date(); // UTC Standard ISO 8601
const LOCAL_DATE = Date(); // Local Date
const UNIX_EPOCH_DATE = Date.now(); // POSIX / Unix Epoch

console.log("UTC_DATE", UTC_DATE);
console.log("LOCAL_DATE", LOCAL_DATE);
console.log("UNIX_EPOCH_DATE", UNIX_EPOCH_DATE);

// ============== OUTPUT ==============
// UTC_DATE 2025-02-20T07:57:07.082Z
// LOCAL_DATE 2025-02-20T07:57:07.082Z
// UNIX_EPOCH_DATE 1740038227082

const danishDate = new Intl.DateTimeFormat("da-dk").format(UTC_DATE);
console.log("danishDate", danishDate);
// ============== OUTPUT ==============
// danishDate 20.2.2025