// T_indicators – таблица показателей, содержит поле «Наименование»
const P_indicators = ['tfc']
// T_resources – таблица ресурсов, содержит поле «Наименование».
const P_resources = ['gas']
// T_years – таблица календарных лет, содержит поле «Наименование»
const P_years = [2017, 2018, 2019, 2020, 2021]
// T_values – таблица значений, содержит поля: «Показатель», «Ресурс», «Год», «Единица измерения»,
// «Значение».
const T_values = [
	{ indicator: 'tfc', resource: 'gas', year: 2017, unit: 'Mtoe', value: 148.67 },
	{ indicator: 'tfc', resource: 'gas', year: 2018, unit: 'Mtoe', value: 149.33 },
	{ indicator: 'tfc', resource: 'gas', year: 2019, unit: 'Mtoe', value: 150.00 },
	{ indicator: 'tfc', resource: 'gas', year: 2020, unit: 'Mtoe', value: 150.67 },
	{ indicator: 'tfc', resource: 'gas', year: 2021, unit: 'Mtoe', value: 151.33 },
]
// T_multiplication – таблица мультипликации единиц измерения, содержит поля: «Наименование»,
// «Базовая ЕИ», «Расчетная ЕИ», «Степень».
const T_multiplication = [
	{ name: 'Gft3ng <--> ft3ng', calculationUnit: 'Gft3ng', exponent: -9, baseUnit: 'ft3ng' },
	{ name: 'Gtce <--> tce', calculationUnit: 'Gtce', exponent: -9, baseUnit: 'tce' },
	{ name: 'Gtoe <--> toe', calculationUnit: 'Gtoe', exponent: -9, baseUnit: 'toe' },
	{ name: 'MMbtu <--> btu', calculationUnit: 'MMbtu', exponent: -6, baseUnit: 'btu' },
	{ name: 'Mj <--> j', calculationUnit: 'Mj', exponent: -6, baseUnit: 'j' },
	{ name: 'Kboe <--> boe', calculationUnit: 'Kboe', exponent: -3, baseUnit: 'boe' },
	{ name: 'Mtoe <--> toe', calculationUnit: 'Mtoe', exponent: -6, baseUnit: 'toe' },
	{ name: 'Twh <--> wh', calculationUnit: 'Twh', exponent: -12, baseUnit: 'wh' },
	{ name: 'Ktoe <--> toe', calculationUnit: 'Ktoe', exponent: -3, baseUnit: 'toe' },
	{ name: 'Gj <--> j', calculationUnit: 'Gj', exponent: -9, baseUnit: 'j' },
	{ name: 'Mboe <--> boe', calculationUnit: 'Mboe', exponent: -6, baseUnit: 'boe' },
	{ name: 'Mtce <--> tce', calculationUnit: 'Mtce', exponent: -6, baseUnit: 'tce' },
	{ name: 'Gm3ng <--> m3ng', calculationUnit: 'Gm3ng', exponent: -9, baseUnit: 'm3ng' },
	{ name: 'Bboe <--> boe', calculationUnit: 'Bboe', exponent: -9, baseUnit: 'boe' },
	{ name: 'Qbtu <--> btu', calculationUnit: 'Qbtu', exponent: -15, baseUnit: 'btu' },
	{ name: 'Mm3ng <--> m3ng', calculationUnit: 'Mm3ng', exponent: -6, baseUnit: 'm3ng' },
	{ name: 'Mft3ng <--> ft3ng', calculationUnit: 'Mft3ng', exponent: -6, baseUnit: 'ft3ng' },
	{ name: 'Gwh <--> wh', calculationUnit: 'Gwh', exponent: -9, baseUnit: 'wh' }
]
// T_convertation – таблица конвертации единиц измерения, содержит поля: «Наименование»,
// «Исходная ЕИ», «Результирующая ЕИ», «Коэффициент»
const T_convertation = [
	{ name: 'Mtce --> Mm3ng', initialUnit: 'Mtce', coefficient: 751.4768963, resultingUnit: 'Mm3ng' },
	{ name: 'Gft3ng --> Twh', initialUnit: 'Gft3ng', coefficient: 0.301277062, resultingUnit: 'Twh' },
	{ name: 'MMbtu --> Mj', initialUnit: 'MMbtu', coefficient: 1055.060005, resultingUnit: 'Mj' },
	{ name: 'Bboe --> Qbtu', initialUnit: 'Bboe', coefficient: 0.58000001, resultingUnit: 'Qbtu' },
	{ name: 'Gtoe --> Gtce', initialUnit: 'Gtoe', coefficient: 1.4285714, resultingUnit: 'Gtce' },
	{ name: 'Gj --> Gwh', initialUnit: 'Gj', coefficient: 0.000277778, resultingUnit: 'Gwh' },
	{ name: 'Ktoe --> Kboe', initialUnit: 'Ktoe', coefficient: 6.8419054, resultingUnit: 'Kboe' },
	{ name: 'Gm3ng --> Gft3ng', initialUnit: 'Gm3ng', coefficient: 35.958043, resultingUnit: 'Gft3ng' }
]
// E – степень мультипликации, поле «Степень» в T_multiplication.
// K – коэффициент конвертации, поле «Коэффициент» в T_convertation.

function calculationAlgorithm() {
	const result = T_values.slice()
	// 1. Начало расчета:
	// 2. Получить P_indicators – параметр запуска расчета, массив записей таблицы T_indicators;
	// 3. Получить P_resources – параметр запуска расчета, массив записей таблицы T_resources;
	// 4. Получить P_years – параметра запуска расчета, массив записей таблицы T_years;
	// 5. Для очередного показателя I из P_indicators:
	for (const I of P_indicators) {
		// 5.1. Для очередного ресурса R из P_resources:
		for (const R of P_resources) {
			// 5.1.1. Для очередного года Y из P_years:
			for (const Y of P_years) {
				while (true) {
					// 5.1.1.1. Получить M_values – массив записей T_values, каждая из которых удовлетворяет
					// условию [[Значение поля «Показатель» = I] и [Значение поля «Ресурс» = R] и [Значение
					// поля «Год» = Y]];
					const M_values = result.filter(x => x.indicator === I && x.resource === R && x.year === Y)
					const units = M_values.map(x => x.unit)
					// 5.1.1.2. Получить M_calculated – массив записей T_multiplication, каждая из которых
					// удовлетворяет условию [[Значение поля «Базовая ЕИ» содержится в поле «Единица
					// измерения» какой-либо записи M_values] и [Значение поля «Расчетная ЕИ» не
					// содержится в поле «Единица измерения» записей M_values]];
					const M_calculated = T_multiplication.filter(x => units.includes(x.baseUnit) && !units.includes(x.calculationUnit))
					// 5.1.1.3. Получить M_based – массив записей T_multiplication, каждая из которых
					// удовлетворяет условию [[Значение поля «Расчетная ЕИ» содержится в поле «Единица
					// измерения» какой-либо записи M_values] и [Значение поля «Базовая ЕИ» не содержится
					// в поле «Единица измерения» записей M_values]];
					const M_based = T_multiplication.filter(x => !units.includes(x.baseUnit) && units.includes(x.calculationUnit))
					// 5.1.1.4. Получить M_result – массив записей T_convertation, каждая из которых
					// удовлетворяет условию [[Значение поля «Исходная ЕИ» содержится в поле «Единица
					// измерения» какой-либо записи M_values] и [Значение поля «Результирующая ЕИ» не
					// содержится в поле «Единица измерения» записей M_values]];
					const M_result = T_convertation.filter(x => units.includes(x.initialUnit) && !units.includes(x.resultingUnit))
					// 5.1.1.5. Если [[M_calculated пусто] и [M_based пусто] и [M_result пусто]], то перейти в 5.1.2,
					// иначе перейти в 5.1.1.5.1:
					if (M_calculated.length + M_based.length + M_result.length === 0) {
						break;
					}
					// 5.1.1.5.1. Если [M_calculated пусто], то перейти в 5.1.1.5.2, иначе перейти в 5.1.1.5.1.1:
					if (M_calculated.length) {
						// 5.1.1.5.1.1. Для каждой записи M_values, у которой значение поля «Единица
						// измерения» содержится в поле «Базовая ЕИ» записей M_calculated, рассчитать
						// значения в единицах измерения, которые содержатся в поле «Расчетная ЕИ»
						// соответствующих записей M_calculated по формуле: [Значение в расчетной ЕИ
						// = Значение в базовой ЕИ * 10 E
						// ];
						for (const v of M_values) {
							for (const c of M_calculated) {
								if (c.baseUnit === v.unit) {
									// 5.1.1.5.1.2. Записать в T_values для I, R, Y все значения, рассчитанные в
									// расчетных единицах измерения, перейти в 5.1.1.5.2;
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: c.calculationUnit,
										value: v.value * 10 ** c.exponent
									})
								}
							}
						}
					}
					// 5.1.1.5.2. Если [M_based пусто], то перейти в 5.1.1.5.3, иначе перейти в 5.1.1.5.2.1:
					if (M_based.length) {
						// 5.1.1.5.2.1. Для каждой записи M_values, у которой значение поля «Единица
						// измерения» содержится в поле «Расчетная ЕИ» записей M_based, рассчитать
						// значения в единицах измерения, которые содержатся в поле «Базовая ЕИ»
						// соответствующих записей M_based по формуле: [Значение в базовой ЕИ =
						// Значение в расчетной ЕИ * 10 –E
						// ];
						for (const v of M_values) {
							for (const b of M_based) {
								if (b.calculationUnit === v.unit) {
									// 5.1.1.5.2.2. Записать в T_values для I, R, Y все значения, рассчитанные в базовых
									// единицах измерения, перейти в 5.1.1.5.3;
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: b.baseUnit,
										value: v.value * 10 ** (-b.exponent)
									})
								}
							}
						}

					}
					// 5.1.1.5.3. Если [M_result пусто], то перейти в 5.1.1.1, иначе перейти в 5.1.1.5.3.1:
					if (M_result.length) {
						// 5.1.1.5.3.1. Для каждой записи M_values, у которой значение поля «Единица
						// измерения» содержится в поле «Исходная ЕИ» записей M_result, рассчитать
						// значения в единицах измерения, которые содержатся в поле «Результирующая
						// ЕИ» соответствующих записей M_result по формуле: [Значение в
						// результирующей ЕИ = Значение в исходной ЕИ * K];
						for (const v of M_values) {
							for (const r of M_result) {
								if (r.initialUnit === v.unit) {
									// 5.1.1.5.3.2. Записать в T_values для I, R, Y все значения, рассчитанные в
									// результирующих единицах измерения, перейти в 5.1.1.1;
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: r.resultingUnit,
										value: v.value * r.coefficient
									})
								}
							}
						}
						// 5.1.1.5.3.2. Записать в T_values для I, R, Y все значения, рассчитанные в
						// результирующих единицах измерения, перейти в 5.1.1.1;
					}
				}
			}
			// 5.1.2. Если по всем Y из P_years расчет завершен, то перейти в 5.2, иначе перейти в 5.1.1;
		}
		// 5.2. Если по всем R из P_resources расчет завершен, то перейти в 6, иначе перейти в 5.1;
	}
	// 6. Если по всем I из P_indicators расчет завершен, то перейти в 7, иначе перейти в 5;
	// 7. Конец расчета
	return result
}

const result = calculationAlgorithm()
for (const item of result) {
	console.log(item);
}
/* //для 2017 года (для 2018, 2019, 2020, 2021 также повторяется Gwh)
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mtoe',
	value: 148.67
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2018,
	unit: 'Mtoe',
	value: 149.33
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2019,
	unit: 'Mtoe',
	value: 150
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2020,
	unit: 'Mtoe',
	value: 150.67
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2021,
	unit: 'Mtoe',
	value: 151.33
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'toe',
	value: 148670000
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gtoe',
	value: 0.14867
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Ktoe',
	value: 148670
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gtce',
	value: 0.212385710038
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Kboe',
	value: 1017186.075818
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'tce',
	value: 212385710.038
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'boe',
	value: 1017186075.818
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mtce',
	value: 212.38571003799998
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mboe',
	value: 1017.186075818
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Bboe',
	value: 1.017186075818
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mm3ng',
	value: 159602.954197828
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Qbtu',
	value: 0.5899679341463008
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'm3ng',
	value: 159602954197.828
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'btu',
	value: 589967934146300.8
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gm3ng',
	value: 159.602954197828
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'MMbtu',
	value: 589967934.1463007
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gft3ng',
	value: 5739.009889972531
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mj',
	value: 622451571550.2357
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'ft3ng',
	value: 5739009889972.531
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'j',
	value: 622451571550235800
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Twh',
	value: 1729.0320384398672
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mft3ng',
	value: 5739009.889972531
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gj',
	value: 622451571.5502359
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'wh',
	value: 1729032038439867.2
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gwh',
	value: 1729032.0384398673
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gwh',
	value: 172903.35264208142
}*/

// Получаем Gwh дважды, первое правильное (например, для 2017 года: 148.67Mtoe=1729032.1Gwh (1toe = 11630000 Wh))
// https://www.translatorscafe.com/unit-converter/ru-RU/energy/60-20/chilogrammo-cavallo%20vapore%20ora/
// и второе неправильное

// Выведем названия конвертаций единиц измерения
function calculationAlgorithmChanged() {
	const result = []
	for (const I of P_indicators) {
		for (const R of P_resources) {
			for (const Y of P_years) {
				for (const v of T_values) {
					if (v.indicator === I && v.resource === R && v.year === Y) {
						v.name = 'source'
						result.push(v)
					}
				}
				while (true) {
					const M_values = result.filter(x => x.indicator === I && x.resource === R && x.year === Y)
					const units = M_values.map(x => x.unit)
					const M_calculated = T_multiplication.filter(x => units.includes(x.baseUnit) && !units.includes(x.calculationUnit))
					const M_based = T_multiplication.filter(x => !units.includes(x.baseUnit) && units.includes(x.calculationUnit))
					const M_result = T_convertation.filter(x => units.includes(x.initialUnit) && !units.includes(x.resultingUnit))
					if (M_calculated.length + M_based.length + M_result.length === 0) {
						break;
					}
					if (M_calculated.length) {
						for (const v of M_values) {
							for (const c of M_calculated) {
								if (c.baseUnit === v.unit) {
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: c.calculationUnit,
										value: v.value * 10 ** c.exponent,
										name: c.name
									})
								}
							}
						}
					}
					if (M_based.length) {
						for (const v of M_values) {
							for (const b of M_based) {
								if (b.calculationUnit === v.unit) {
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: b.baseUnit,
										value: v.value * 10 ** (-b.exponent),
										name: b.name
									})
								}
							}
						}

					}
					if (M_result.length) {
						for (const v of M_values) {
							for (const r of M_result) {
								if (r.initialUnit === v.unit) {
									result.push({
										indicator: I,
										resource: R,
										year: Y,
										unit: r.resultingUnit,
										value: v.value * r.coefficient,
										name: r.name
									})
								}
							}
						}
					}
				}
			}
		}
	}
	return result
}

const resultChanged = calculationAlgorithmChanged()
for (const item of resultChanged) {
	console.log(item);
}

/*
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mtoe',
	value: 148.67,
	name: 'source'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'toe',
	value: 148670000,
	name: 'Mtoe <--> toe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gtoe',
	value: 0.14867,
	name: 'Gtoe <--> toe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Ktoe',
	value: 148670,
	name: 'Ktoe <--> toe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gtce',
	value: 0.212385710038,
	name: 'Gtoe --> Gtce'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Kboe',
	value: 1017186.075818,
	name: 'Ktoe --> Kboe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'tce',
	value: 212385710.038,
	name: 'Gtce <--> tce'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'boe',
	value: 1017186075.818,
	name: 'Kboe <--> boe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mtce',
	value: 212.38571003799998,
	name: 'Mtce <--> tce'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mboe',
	value: 1017.186075818,
	name: 'Mboe <--> boe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Bboe',
	value: 1.017186075818,
	name: 'Bboe <--> boe'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mm3ng',
	value: 159602.954197828,
	name: 'Mtce --> Mm3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Qbtu',
	value: 0.5899679341463008,
	name: 'Bboe --> Qbtu'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'm3ng',
	value: 159602954197.828,
	name: 'Mm3ng <--> m3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'btu',
	value: 589967934146300.8,
	name: 'Qbtu <--> btu'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gm3ng',
	value: 159.602954197828,
	name: 'Gm3ng <--> m3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'MMbtu',
	value: 589967934.1463007,
	name: 'MMbtu <--> btu'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gft3ng',
	value: 5739.009889972531,
	name: 'Gm3ng --> Gft3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mj',
	value: 622451571550.2357,
	name: 'MMbtu --> Mj'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'ft3ng',
	value: 5739009889972.531,
	name: 'Gft3ng <--> ft3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'j',
	value: 622451571550235800,
	name: 'Mj <--> j'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Twh',
	value: 1729.0320384398672,
	name: 'Gft3ng --> Twh'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Mft3ng',
	value: 5739009.889972531,
	name: 'Mft3ng <--> ft3ng'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gj',
	value: 622451571.5502359,
	name: 'Gj <--> j'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'wh',
	value: 1729032038439867.2,
	name: 'Twh <--> wh'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gwh',
	value: 1729032.0384398673,
	name: 'Gwh <--> wh'
}
{
	indicator: 'tfc',
	resource: 'gas',
	year: 2017,
	unit: 'Gwh',
	value: 172903.35264208142,
	name: 'Gj --> Gwh'
}
*/
// Проверяем коэффициенты из таблицы конвертации
// Следующие коэффициенты вычисляются неправильно: toe --> boe, boe --> btu
// 1 toe = 7.1428571428571 boe
// 1 boe = 5551365.2248856 btu

// Оптимизировать алгоритм можно приведя таблицу T_convertation к единицам измерения
// без степенных приставок, также приводим таблицу T_values к единицам измерения
// без степенных приставок с помощью таблицы T_calculation и получить значения всех в цикле
// while всех оставшихся единиц измерения, после чего можно получить все степенные
// приставки этих измерений