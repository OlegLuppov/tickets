export async function getApiResourse(url: string) {
	const resp = await fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})

	if (!resp.ok) {
		return {
			ok: false,
			status: resp.status,
			err: new Error(`Ошибка метода GET: ${resp.statusText} ${url}`),
		}
	}

	try {
		const result = await resp.json()
		return {
			ok: true,
			status: resp.status,
			result,
		}
	} catch (err) {
		return {
			ok: false,
			status: resp.status,
			err: err as Error,
		}
	}
}
