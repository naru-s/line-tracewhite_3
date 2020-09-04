let LAPTIME = 0
function LineTrace () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    }
}
function PathFind () {
    while (true) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
        basic.pause(100)
        if (maqueen.Ultrasonic(PingUnit.Centimeters) != 0 && maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
            basic.pause(800)
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            basic.pause(200)
            break;
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
            basic.pause(200)
            break;
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
            basic.pause(200)
        }
    }
}
function TurnBack () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
        while (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        	
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        while (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        	
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        LAPTIME = input.runningTime()
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        while (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            if (input.runningTime() - LAPTIME > 3000) {
                PathFind()
            }
        }
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        while (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            if (input.runningTime() - LAPTIME > 3000) {
                PathFind()
            }
        }
        while (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            if (input.runningTime() - LAPTIME > 3000) {
                PathFind()
            }
        }
    }
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) != 0 && maqueen.Ultrasonic(PingUnit.Centimeters) < 10) {
        TurnBack()
    }
    LineTrace()
})
