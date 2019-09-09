#!/usr/bin/env bash

while true
do
	node main.js
	SleepingTime=$(shuf -i180-300 -n1)
	echo "Done, waiting $SleepingTime seconds"
	# Wait between 2 and 5 minutes
	sleep $SleepingTime
	echo "Restarting"
done
