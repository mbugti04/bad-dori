with open('D:/Documents - Data drive/Code/bad-dori/docs/R.txt', 'r') as f:
	lines = f.read().splitlines()
	for x in lines:
		lane = x[:2]
		sec = x[3:]
		print(f'{{x:{lane}, y:-noteh, sec: {sec}, active:true}},')
