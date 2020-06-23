# Results

| Benchmark   | Bytes       | Avg. time            |
|-------------|-------------|----------------------|
| Declarative | 1034.65 KiB | 219.23 - 221.29 ms   |
| Inline      | 3720.14 KiB | 1245.22 - 1250.77 ms |
| Single Loop | 1044.70 KiB | 230.76 - 232.79 ms   |


To run the benchmark, you must have
[tachometer](https://www.npmjs.com/package/tachometer) installed. Then:

$ build\_tests

$ tach --config ./tachometer.json

